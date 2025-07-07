import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supported languages
const LANGUAGES = ['en', 'ja', 'sv'];

// Function to get all landing pages organized by category
function getInspirationData() {
  const landingPagesDir = path.join(__dirname, '../public/content/landing-pages');
  const inspirationData = {};

  LANGUAGES.forEach(lang => {
    const langDir = path.join(landingPagesDir, lang);
    inspirationData[lang] = {};
    
    if (fs.existsSync(langDir)) {
      // Scan categories
      const categories = fs.readdirSync(langDir).filter(item => {
        return fs.statSync(path.join(langDir, item)).isDirectory();
      });

      categories.forEach(category => {
        const categoryDir = path.join(langDir, category);
        inspirationData[lang][category] = [];

        // Scan for JSON files in category
        function scanCategoryDirectory(dir, subcategory = '') {
          const items = fs.readdirSync(dir);
          
          items.forEach(item => {
            const itemPath = path.join(dir, item);
            const stat = fs.statSync(itemPath);
            
            if (stat.isDirectory()) {
              // Handle subcategories
              scanCategoryDirectory(itemPath, item);
            } else if (item.endsWith('.json')) {
              try {
                const content = fs.readFileSync(itemPath, 'utf8');
                const data = JSON.parse(content);
                
                if (data.title && data.description) {
                  const slug = item.replace('.json', '');
                  const urlPath = subcategory ? `${category}/${subcategory}/${slug}` : `${category}/${slug}`;
                  
                  inspirationData[lang][category].push({
                    title: data.title,
                    description: data.description,
                    slug: slug,
                    subcategory: subcategory || null,
                    url: `/${lang}/${urlPath}`,
                    features: data.features || [],
                    tags: data.tags || []
                  });
                }
              } catch (error) {
                console.warn(`Warning: Could not parse ${itemPath}:`, error.message);
              }
            }
          });
        }

        scanCategoryDirectory(categoryDir);
      });
    }
  });

  return inspirationData;
}

// Function to format category names for display
function formatCategoryName(category) {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Generate inspiration data
try {
  const inspirationData = getInspirationData();
  const outputDir = path.join(__dirname, '../public/content/inspiration');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate data for each language
  LANGUAGES.forEach(lang => {
    const langData = inspirationData[lang];
    const formattedData = {};

    // Format the data with proper category names and sorting
    Object.keys(langData).forEach(category => {
      const categoryName = formatCategoryName(category);
      formattedData[categoryName] = {
        slug: category,
        pages: langData[category].sort((a, b) => a.title.localeCompare(b.title))
      };
    });

    // Write the data file
    const outputPath = path.join(outputDir, `${lang}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(formattedData, null, 2), 'utf8');
    
    console.log(`✅ Generated inspiration data for ${lang}: ${Object.keys(formattedData).length} categories, ${Object.values(formattedData).reduce((sum, cat) => sum + cat.pages.length, 0)} pages`);
  });

  console.log(`📍 Inspiration data saved to: ${outputDir}`);
  
} catch (error) {
  console.error('❌ Error generating inspiration data:', error);
  process.exit(1);
}