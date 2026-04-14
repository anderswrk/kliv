#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Simple Node.js database client for absolute URLs
class NodeDatabase {
  constructor(baseUrl = 'https://kliv.kliv.site/api/v2/database') {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const finalOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    if (finalOptions.body && typeof finalOptions.body === 'object') {
      finalOptions.body = JSON.stringify(finalOptions.body);
    }

    const response = await fetch(url, finalOptions);
    
    if (!response.ok) {
      throw new Error(`Database request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  async query(table, filters = {}) {
    let endpoint = `/${table}`;
    
    if (Object.keys(filters).length > 0) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        params.append(key, value);
      });
      endpoint += `?${params.toString()}`;
    }

    return this.request(endpoint);
  }

  async insert(table, data) {
    return this.request(`/${table}`, {
      method: 'POST',
      body: data,
    });
  }
}

const db = new NodeDatabase();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the landing pages content
const contentBasePath = path.join(__dirname, '../public/content/landing-pages');

// Function to recursively get all JSON files
function getAllJsonFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllJsonFiles(filePath, fileList);
    } else if (file.endsWith('.json')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to get slug from file path
function getSlugFromPath(filePath) {
  const relativePath = path.relative(contentBasePath, filePath);
  const pathParts = relativePath.split(path.sep);
  
  // Remove language folder (en, ja, sv) and file extension
  const language = pathParts[0];
  const slugWithExt = pathParts.slice(1).join('/');
  const slug = slugWithExt.replace('.json', '');
  
  return { language, slug };
}

// Main migration function
async function migrateMissingLandingPages() {
  console.log('🚀 Starting additive landing pages migration...');
  
  try {
    // Get all existing pages from database
    console.log('📋 Fetching existing pages from database...');
    const existingPages = await db.query('landing_pages');
    const existingSlugs = new Set(existingPages.map(page => `${page.language}-${page.slug}`));
    console.log(`✅ Found ${existingPages.length} existing pages in database`);
    
    // Get all JSON files
    console.log('📁 Scanning for landing page JSON files...');
    const jsonFiles = getAllJsonFiles(contentBasePath);
    console.log(`✅ Found ${jsonFiles.length} JSON files`);
    
    let addedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    // Process each file
    for (const filePath of jsonFiles) {
      try {
        const { language, slug } = getSlugFromPath(filePath);
        const pageKey = `${language}-${slug}`;
        
        // Skip if already exists
        if (existingSlugs.has(pageKey)) {
          skippedCount++;
          continue;
        }
        
        // Read and parse JSON file
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const pageData = JSON.parse(fileContent);
        
        // Extract page data
        const category = path.dirname(path.relative(path.join(contentBasePath, language), filePath));
        const defaultPrompt = pageData.defaultPrompt || '';
        const description = pageData.description || '';
        const metaDescription = pageData.metaDescription || '';
        
        // Insert into database
        await db.insert('landing_pages', {
          language,
          slug,
          category,
          default_prompt: defaultPrompt,
          description,
          meta_description: metaDescription
        });
        
        console.log(`✅ Added: ${language}/${slug}`);
        addedCount++;
        
      } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
        errorCount++;
      }
    }
    
    console.log('\n📊 Migration Summary:');
    console.log(`✅ Added: ${addedCount} new pages`);
    console.log(`⏭️  Skipped: ${skippedCount} existing pages`);
    console.log(`❌ Errors: ${errorCount} files`);
    console.log(`🎉 Total pages in database: ${existingPages.length + addedCount}`);
    
  } catch (error) {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
migrateMissingLandingPages();