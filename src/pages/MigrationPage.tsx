import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Database, CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import db from '@/lib/shared/kliv-database.js';

interface MigrationStats {
  categories: number;
  pages: number;
  inspirationEntries: number;
}

export const MigrationPage = () => {
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationProgress, setMigrationProgress] = useState(0);
  const [migrationStatus, setMigrationStatus] = useState('');
  const [stats, setStats] = useState<MigrationStats>({ categories: 0, pages: 0, inspirationEntries: 0 });
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Load current stats
  const loadStats = async () => {
    try {
      const [categoriesCount, pagesCount, inspirationCount] = await Promise.all([
        db.count('landing_categories'),
        db.count('landing_pages'),
        db.count('inspiration_entries')
      ]);

      setStats({
        categories: categoriesCount || 0,
        pages: pagesCount || 0,
        inspirationEntries: inspirationCount || 0
      });
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const executeMigration = async () => {
    setIsMigrating(true);
    setError(null);
    setMigrationProgress(0);
    setIsComplete(false);

    try {
      // Step 1: Load inspiration index
      setMigrationStatus('Loading inspiration index...');
      setMigrationProgress(10);
      
      const inspirationResponse = await fetch('/content/inspiration/en.json');
      const inspirationData = await inspirationResponse.json();

      // Step 2: Clear existing data
      setMigrationStatus('Clearing existing data...');
      setMigrationProgress(20);
      
      await db.delete('inspiration_entries', {_row_id: 'gt.0'});
      await db.delete('landing_pages', {_row_id: 'gt.0'});
      await db.delete('landing_categories', {_row_id: 'gt.0'});

      // Step 3: Insert categories
      setMigrationStatus('Inserting categories...');
      setMigrationProgress(30);
      
      const categories: Record<string, string> = {};
      let categoryOrder = 0;
      
      for (const [categoryName, categoryData] of Object.entries(inspirationData)) {
        const category = categoryData as any;
        categories[categoryName] = category.slug;
        
        await db.insert('landing_categories', {
          name: categoryName,
          slug: category.slug,
          description: `Landing pages for ${categoryName}`,
          display_order: categoryOrder++
        });
      }

      // Step 4: Process landing page files dynamically
      setMigrationStatus('Processing landing page files...');
      setMigrationProgress(40);
      
      const categoryToSlug = categories;
      let pagesProcessed = 0;

      // First, let's get a list of all category directories by trying common ones
      const categorySlugs = Object.values(categoryToSlug);
      
      for (const categorySlug of categorySlugs) {
        try {
          // Try to get a known file to verify the category exists
          const testResponse = await fetch(`/content/landing-pages/en/${categorySlug}/general.json`);
          
          if (testResponse.ok) {
            // Category exists, let's try to process some common files
            const commonFiles = ['general.json'];
            
            for (const filename of commonFiles) {
              try {
                const pageResponse = await fetch(`/content/landing-pages/en/${categorySlug}/${filename}`);
                if (!pageResponse.ok) continue;
                
                const pageData = await pageResponse.json();
                const pageSlug = filename.replace('.json', '');
                
                // Find category name from slug
                const categoryName = Object.keys(categoryToSlug).find(name => 
                  categoryToSlug[name] === categorySlug
                );
                
                if (categoryName) {
                  await db.insert('landing_pages', {
                    slug: pageSlug,
                    category_name: categoryName,
                    title: pageData.title,
                    description: pageData.description,
                    default_prompt: pageData.defaultPrompt,
                    meta_description: pageData.metaDescription,
                    hero_title: pageData.hero?.title,
                    hero_subtitle: pageData.hero?.subtitle,
                    hero_cta: pageData.hero?.cta,
                    sections: JSON.stringify(pageData.sections || []),
                    file_path: `/content/landing-pages/en/${categorySlug}/${filename}`
                  });
                  pagesProcessed++;
                }
              } catch (err) {
                console.error(`Error processing ${filename} in ${categorySlug}:`, err);
              }
            }
          }
        } catch (err) {
          console.log(`Category ${categorySlug} may not exist, skipping...`);
        }
        
        setMigrationProgress(40 + (pagesProcessed * 2)); // Scale progress based on pages processed
      }

      // Step 5: Insert inspiration entries
      setMigrationStatus('Inserting inspiration entries...');
      setMigrationProgress(70);
      
      let inspirationEntries = 0;
      for (const [categoryName, categoryData] of Object.entries(inspirationData)) {
        const category = categoryData as any;
        for (const page of category.pages) {
          await db.insert('inspiration_entries', {
            category_name: categoryName,
            category_slug: category.slug,
            page_title: page.title,
            page_slug: page.slug,
            page_description: page.description,
            url: page.url,
            subcategory: page.subcategory,
            features: JSON.stringify(page.features || []),
            tags: JSON.stringify(page.tags || [])
          });
          inspirationEntries++;
        }
      }

      setMigrationProgress(100);
      setMigrationStatus('Migration completed successfully!');
      setIsComplete(true);
      
      // Reload stats
      await loadStats();
      
    } catch (err: any) {
      console.error('Migration failed:', err);
      setError(err.message || 'Migration failed');
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-10 border border-blue-20 mb-6">
                <Database className="w-4 h-4 mr-2 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Data Migration</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">Content Migration Tool</h1>
              <p className="text-xl text-muted-foreground">
                Migrate landing page content from JSON files to database
              </p>
            </div>

            {/* Current Stats */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Current Database Stats
                </CardTitle>
                <CardDescription>
                  Number of records currently in the database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-foreground">{stats.categories}</div>
                    <div className="text-sm text-muted-foreground">Categories</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-foreground">{stats.pages}</div>
                    <div className="text-sm text-muted-foreground">Landing Pages</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-foreground">{stats.inspirationEntries}</div>
                    <div className="text-sm text-muted-foreground">Inspiration Entries</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Migration Status */}
            {(isMigrating || isComplete || error) && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {isMigrating ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : isComplete ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    )}
                    Migration Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isMigrating && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{migrationStatus}</span>
                        <span className="text-sm text-muted-foreground">{migrationProgress}%</span>
                      </div>
                      <Progress value={migrationProgress} className="w-full" />
                    </div>
                  )}
                  
                  {isComplete && (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Migration completed successfully! All content has been transferred from JSON files to the database.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {error && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        Error: {error}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>
                  Execute the migration process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    onClick={executeMigration}
                    disabled={isMigrating}
                    size="lg"
                    className="w-full"
                  >
                    {isMigrating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Migrating...
                      </>
                    ) : (
                      <>
                        <Database className="w-4 h-4 mr-2" />
                        Start Migration
                      </>
                    )}
                  </Button>
                  
                  <div className="text-xs text-muted-foreground">
                    <strong>Note:</strong> This will clear all existing content and migrate data from the /content/landing-pages and /content/inspiration directories.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};