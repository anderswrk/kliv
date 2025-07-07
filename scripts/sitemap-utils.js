import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to validate landing page JSON files
export function validateLandingPages() {
  const landingPagesDir = path.join(__dirname, '../public/content/landing-pages');
  const errors = [];
  const validPages = [];

  function scanDirectory(dir, relativePath = '') {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        scanDirectory(itemPath, path.join(relativePath, item));
      } else if (item.endsWith('.json')) {
        try {
          const content = fs.readFileSync(itemPath, 'utf8');
          const data = JSON.parse(content);
          
          // Basic validation
          if (!data.title || !data.description) {
            errors.push(`${relativePath}/${item}: Missing required fields (title, description)`);
          } else {
            validPages.push(`${relativePath}/${item}`);
          }
        } catch (error) {
          errors.push(`${relativePath}/${item}: Invalid JSON - ${error.message}`);
        }
      }
    });
  }

  // Scan all language directories
  const languages = ['en', 'ja', 'sv'];
  languages.forEach(lang => {
    const langDir = path.join(landingPagesDir, lang);
    scanDirectory(langDir, lang);
  });

  return { errors, validPages };
}

// Function to get sitemap statistics
export function getSitemapStats() {
  const landingPagesDir = path.join(__dirname, '../public/content/landing-pages');
  const stats = {
    languages: [],
    categories: new Set(),
    totalPages: 0,
    pagesByLanguage: {}
  };

  const languages = ['en', 'ja', 'sv'];
  
  languages.forEach(lang => {
    const langDir = path.join(landingPagesDir, lang);
    if (fs.existsSync(langDir)) {
      stats.languages.push(lang);
      stats.pagesByLanguage[lang] = 0;
      
      function countPages(dir) {
        const items = fs.readdirSync(dir);
        
        items.forEach(item => {
          const itemPath = path.join(dir, item);
          const stat = fs.statSync(itemPath);
          
          if (stat.isDirectory()) {
            stats.categories.add(item);
            countPages(itemPath);
          } else if (item.endsWith('.json')) {
            stats.pagesByLanguage[lang]++;
            stats.totalPages++;
          }
        });
      }
      
      countPages(langDir);
    }
  });

  stats.categories = Array.from(stats.categories);
  return stats;
}