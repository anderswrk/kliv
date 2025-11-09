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

      // Step 2: Get existing data to avoid duplicates
      setMigrationStatus('Checking existing data...');
      setMigrationProgress(20);
      
      const existingPages = await db.query('landing_pages');
      const existingCategories = await db.query('landing_categories');
      const existingInspiration = await db.query('inspiration_entries');
      
      const existingPageKeys = new Set(existingPages.map((p: any) => `${p.language || 'en'}-${p.slug}`));
      const existingCategoryNames = new Set(existingCategories.map((c: any) => c.name));
      const existingInspirationKeys = new Set(existingInspiration.map((i: any) => `${i.category_name}-${i.page_slug}`));

      // Step 3: Insert new categories (skip existing)
      setMigrationStatus('Checking and inserting new categories...');
      setMigrationProgress(30);
      
      const categories: Record<string, string> = {};
      let categoryOrder = 0;
      let newCategoriesCount = 0;
      
      for (const [categoryName, categoryData] of Object.entries(inspirationData)) {
        const category = categoryData as any;
        categories[categoryName] = category.slug;
        
        // Skip if category already exists
        if (existingCategoryNames.has(categoryName)) {
          console.log(`Skipping existing category: ${categoryName}`);
          continue;
        }
        
        await db.insert('landing_categories', {
          name: categoryName,
          slug: category.slug,
          description: `Landing pages for ${categoryName}`,
          display_order: categoryOrder++
        });
        newCategoriesCount++;
        console.log(`Added new category: ${categoryName}`);
      }
      
      console.log(`Added ${newCategoriesCount} new categories`);

      // Step 4: Process all landing page files dynamically
      setMigrationStatus('Scanning and processing landing page files...');
      setMigrationProgress(40);
      
      const categoryToSlug = categories;
      let pagesProcessed = 0;
      let newPagesCount = 0;
      let filesScanned = 0;

      // Load the index files directly - much more efficient
      const languages = ['en', 'ja', 'sv'];
      
      for (const language of languages) {
        try {
          // Load the inspiration index file for this language
          const indexResponse = await fetch(`/content/inspiration/${language}.json`);
          if (!indexResponse.ok) {
            console.log(`Inspiration index not found for language: ${language}`);
            continue;
          }
          
          const inspirationIndex = await indexResponse.json();
          
          for (const [categoryName, categoryData] of Object.entries(inspirationIndex)) {
            const category = categoryData as any;
            const categorySlug = category.slug;
            
            for (const page of category.pages) {
              const pageSlug = page.slug;
              const pageKey = `${language}-${pageSlug}`;
              
              // Skip if page already exists
              if (existingPageKeys.has(pageKey)) {
                pagesProcessed++;
                continue;
              }
              
              try {
                filesScanned++;
                const pageResponse = await fetch(`/content/landing-pages/${language}/${categorySlug}/${pageSlug}.json`);
                if (!pageResponse.ok) {
                  console.log(`File not found: ${language}/${categorySlug}/${pageSlug}.json`);
                  continue;
                }
                
                const pageData = await pageResponse.json();
                
                await db.insert('landing_pages', {
                  language,
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
                  file_path: `/content/landing-pages/${language}/${categorySlug}/${pageSlug}.json`
                });
                newPagesCount++;
                console.log(`Added new page: ${pageKey}`);
                
              } catch (err) {
                console.error(`Error processing page ${pageKey}:`, err);
                continue;
              }
              
              pagesProcessed++;
            }
          }
          
          // Update progress
          setMigrationProgress(40 + Math.floor((pagesProcessed / 1000) * 30));
          
        } catch (err) {
          console.error(`Error processing language ${language}:`, err);
          continue;
        }
      }
      
      console.log(`Scanned ${filesScanned} files, added ${newPagesCount} new pages`);

      // Step 5: Insert new inspiration entries (skip existing)
      setMigrationStatus('Checking and inserting new inspiration entries...');
      setMigrationProgress(70);
      
      let newInspirationCount = 0;
      for (const [categoryName, categoryData] of Object.entries(inspirationData)) {
        const category = categoryData as any;
        for (const page of category.pages) {
          const inspirationKey = `${categoryName}-${page.slug}`;
          
          // Skip if inspiration entry already exists
          if (existingInspirationKeys.has(inspirationKey)) {
            console.log(`Skipping existing inspiration entry: ${inspirationKey}`);
            continue;
          }
          
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
          newInspirationCount++;
          console.log(`Added new inspiration entry: ${inspirationKey}`);
        }
      }
      
      console.log(`Added ${newInspirationCount} new inspiration entries`);

      setMigrationProgress(100);
      setMigrationStatus(`Delta migration completed! Added ${newCategoriesCount} new categories, ${newPagesCount} new pages, and ${newInspirationCount} new inspiration entries.`);
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
                    <strong>Note:</strong> This will scan for new content and only add missing pages, categories, and inspiration entries. Existing data will be preserved.
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