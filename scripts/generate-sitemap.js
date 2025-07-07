import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URL for your site
const BASE_URL = 'https://kliv.dev';

// Supported languages
const LANGUAGES = ['en', 'ja', 'sv'];

// Static pages (without language prefix)
const STATIC_PAGES = [
  '',
  'about',
  'features',
  'pricing',
  'careers',
  'privacy',
  'terms',
  'security',
  'signup',
  'login'
];

// Function to get all landing page files
function getLandingPages() {
  const landingPagesDir = path.join(__dirname, '../public/content/landing-pages');
  const pages = [];

  LANGUAGES.forEach(lang => {
    const langDir = path.join(landingPagesDir, lang);
    
    if (fs.existsSync(langDir)) {
      // Recursively scan directories
      function scanDirectory(dir, relativePath = '') {
        const items = fs.readdirSync(dir);
        
        items.forEach(item => {
          const itemPath = path.join(dir, item);
          const stat = fs.statSync(itemPath);
          
          if (stat.isDirectory()) {
            // Recursively scan subdirectories
            scanDirectory(itemPath, path.join(relativePath, item));
          } else if (item.endsWith('.json')) {
            // Extract the page slug from filename (remove .json extension)
            const slug = item.replace('.json', '');
            const fullPath = relativePath ? `${relativePath}/${slug}` : slug;
            
            pages.push({
              lang,
              path: fullPath,
              url: `${BASE_URL}/${lang}/${fullPath}`
            });
          }
        });
      }
      
      scanDirectory(langDir);
    }
  });

  return pages;
}

// Function to generate sitemap XML
function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static pages for each language
  LANGUAGES.forEach(lang => {
    STATIC_PAGES.forEach(page => {
      const url = page === '' ? `${BASE_URL}/${lang}` : `${BASE_URL}/${lang}/${page}`;
      const priority = page === '' ? '1.0' : '0.8';
      
      sitemap += `
  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    });
  });

  // Add dynamic landing pages
  const landingPages = getLandingPages();
  landingPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

// Generate and save sitemap
try {
  const sitemapContent = generateSitemap();
  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  
  fs.writeFileSync(outputPath, sitemapContent, 'utf8');
  
  console.log('✅ Sitemap generated successfully!');
  console.log(`📍 Location: ${outputPath}`);
  
  // Count URLs for summary
  const landingPages = getLandingPages();
  const staticUrls = STATIC_PAGES.length * LANGUAGES.length;
  const totalUrls = staticUrls + landingPages.length;
  
  console.log(`📊 Summary:`);
  console.log(`   - Static pages: ${staticUrls}`);
  console.log(`   - Landing pages: ${landingPages.length}`);
  console.log(`   - Total URLs: ${totalUrls}`);
  console.log(`   - Languages: ${LANGUAGES.join(', ')}`);
  
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}