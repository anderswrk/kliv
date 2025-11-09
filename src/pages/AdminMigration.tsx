import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Database, Plus } from 'lucide-react';
import db from '@/lib/shared/kliv-database';

interface MigrationStats {
  totalPages: number;
  totalCategories: number;
  newPagesAdded: number;
}

export default function AdminMigration() {
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<MigrationStats | null>(null);

  const addMissingPages = async () => {
    setIsLoading(true);
    setStats(null);

    try {
      console.log('🚀 Starting migration to add missing pages...');
      
      // Get current counts
      const existingPages = await db.query('landing_pages', { select: 'slug,category_name' });
      const existingCategories = await db.query('landing_categories', { select: 'name' });
      
      const existingPageKeys = new Set(existingPages.map(p => `${p.slug}|${p.category_name}`));
      console.log(`📊 Found ${existingPages.length} existing pages and ${existingCategories.length} categories`);

      // Fetch all JSON files from content filesystem
      let addedCount = 0;
      
      // Since we can't access the filesystem directly, we'll need to create an edge function
      // that can scan the files and return the missing ones
      const response = await fetch('/api/v2/functions/migrate-landing-pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          existingPageKeys: Array.from(existingPageKeys),
          skipExisting: true 
        })
      });

      if (!response.ok) {
        throw new Error(`Migration function error: ${response.statusText}`);
      }

      const result = await response.json();
      addedCount = result.addedCount || 0;

      // Get final counts
      const finalPages = await db.query('landing_pages', { select: '_row_id' });
      const finalCategories = await db.query('landing_categories', { select: 'name' });

      setStats({
        totalPages: finalPages.length,
        totalCategories: finalCategories.length,
        newPagesAdded: addedCount
      });

      toast.success(`Migration completed! Added ${addedCount} new pages.`);
      console.log(`🎉 Migration completed! Added ${addedCount} new pages.`);
      console.log(`📈 Final counts: ${finalPages.length} pages, ${finalCategories.length} categories`);

    } catch (error) {
      console.error('❌ Migration failed:', error);
      toast.error(error instanceof Error ? error.message : 'Migration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
            <Database className="w-8 h-8" />
            Landing Pages Migration
          </h1>
          <p className="text-muted-foreground mt-2">
            Add missing landing pages from the content filesystem to the database
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Missing Pages
            </CardTitle>
            <CardDescription>
              This will scan the content filesystem for landing pages that are not yet in the database 
              and add them without removing existing data.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={addMissingPages}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running Migration...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Missing Pages
                </>
              )}
            </Button>

            {stats && (
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <h3 className="font-semibold">Migration Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>Total Pages: <span className="font-mono font-bold">{stats.totalPages}</span></div>
                  <div>Total Categories: <span className="font-mono font-bold">{stats.totalCategories}</span></div>
                  <div>New Pages Added: <span className="font-mono font-bold text-green-600">{stats.newPagesAdded}</span></div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How it works</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Scans all JSON files in /content/landing-pages/</p>
            <p>• Compares against existing database records</p>
            <p>• Only adds pages that don't already exist</p>
            <p>• Preserves all current data in the database</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}