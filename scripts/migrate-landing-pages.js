import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a database client that works in Node.js
class NodeDatabase {
  constructor() {
    this.baseUrl = 'https://kliv.kliv.site/api/v2/database';
  }

  async request(method, table, params = {}, body = null) {
    const url = table
      ? `${this.baseUrl}/${encodeURIComponent(table)}`
      : this.baseUrl;

    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    }

    const finalUrl = `${url}?${searchParams.toString()}`;
    const options = {
      method,
      headers: {'Accept': 'application/json'}
    };

    if (body) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
    }

    const response = await fetch(finalUrl, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || `${method} request failed`);
    }

    return data;
  }

  async query(table, params = {}) {
    if (!table) throw new Error('Table name is required');
    return this.request('GET', table, params);
  }

  async insert(table, data) {
    return this.request('POST', table, {}, data);
  }
}

const db = new NodeDatabase();

// Supported languages
const LANGUAGES = ['en'];

async function migrateLandingPages() {
  const landingPagesDir = path.join(__dirname, '../public/content/landing-pages');
  
  try {
    console.log('🚀 Starting landing pages migration (additive only)...');
    
    // Get existing pages to avoid duplicates
    console.log('📋 Checking existing pages in database...');
    const existingPages = await db.query('landing_pages', {}, 'select=slug,category_name');
    const existingKeys = new Set(existingPages.map(p => `${p.slug}|${p.category_name}`));
    console.log(`📊 Found ${existingPages.length} existing pages`);

    let addedCount = 0;

    for (const lang of LANGUAGES) {
      const langDir = path.join(landingPagesDir, lang);
      
      if (!fs.existsSync(langDir)) {
        console.log(`⚠️  Directory not found for language: ${lang}`);
        continue;
      }

      // Scan categories
      const categories = fs.readdirSync(langDir).filter(item => {
        return fs.statSync(path.join(langDir, item)).isDirectory();
      });

      console.log(`📁 Processing ${categories.length} categories for ${lang}...`);

      for (const category of categories) {
        const categoryDir = path.join(langDir, category);
        
        // Scan for JSON files in category (including subdirectories)
        async function scanCategoryDirectory(dir, subcategory = '') {
          const items = fs.readdirSync(dir);
          
          for (const item of items) {
            const itemPath = path.join(dir, item);
            const stat = fs.statSync(itemPath);
            
            if (stat.isDirectory()) {
              // Handle subcategories
              await scanCategoryDirectory(itemPath, item);
            } else if (item.endsWith('.json')) {
              try {
                const content = fs.readFileSync(itemPath, 'utf8');
                const data = JSON.parse(content);
                
                if (data.title && data.description) {
                  const slug = item.replace('.json', '');
                  
                  // Skip if this page already exists
                  const pageKey = `${slug}|${category}`;
                  if (existingKeys.has(pageKey)) {
                    continue; // Skip duplicate
                  }

                  // Extract sections data
                  const sections = JSON.stringify(data.sections || []);
                  const features = JSON.stringify(data.features || []);
                  const tags = JSON.stringify(data.tags || []);

                  // Insert the landing page
                  await db.insert('landing_pages', {
                    slug,
                    category_name: category,
                    title: data.title,
                    description: data.description,
                    default_prompt: data.defaultPrompt || '',
                    meta_description: data.metaDescription || data.description,
                    hero_title: data.hero?.title || data.title,
                    hero_subtitle: data.hero?.subtitle || data.description,
                    hero_cta: data.hero?.cta || 'Get Started',
                    sections,
                    file_path: path.relative(path.join(__dirname, '..'), itemPath)
                  });

                  // Insert inspiration entry
                  const urlPath = subcategory ? `${category}/${subcategory}/${slug}` : `${category}/${slug}`;
                  await db.insert('inspiration_entries', {
                    category_name: category,
                    category_slug: category,
                    page_title: data.title,
                    page_slug: slug,
                    page_description: data.description,
                    url: `/${lang}/${urlPath}`,
                    subcategory: subcategory || null,
                    features,
                    tags
                  });

                  addedCount++;
                  console.log(`✅ Added: ${category}/${slug}`);
                }
              } catch (error) {
                console.warn(`⚠️  Could not process ${itemPath}:`, error.message);
              }
            }
          }
        }

        await scanCategoryDirectory(categoryDir);
      }
    }

    console.log(`🎉 Migration completed! Added ${addedCount} new pages.`);
    
    // Verify final counts
    const finalPages = await db.query('landing_pages', {});
    const finalCategories = await db.query('landing_categories', {});
    console.log(`📈 Final counts: ${finalPages.length} pages, ${finalCategories.length} categories`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
migrateLandingPages();