import { validateLandingPages, getSitemapStats } from './sitemap-utils.js';

console.log('🔍 Validating landing pages...\n');

// Validate all landing page JSON files
const { errors, validPages } = validateLandingPages();

if (errors.length > 0) {
  console.log('❌ Validation errors found:');
  errors.forEach(error => console.log(`   ${error}`));
  console.log('');
}

console.log(`✅ Valid pages: ${validPages.length}`);
if (errors.length === 0) {
  console.log('🎉 All landing pages are valid!\n');
}

// Get statistics
const stats = getSitemapStats();

console.log('📊 Sitemap Statistics:');
console.log(`   Languages: ${stats.languages.join(', ')}`);
console.log(`   Categories: ${stats.categories.join(', ')}`);
console.log(`   Total landing pages: ${stats.totalPages}`);
console.log('   Pages by language:');
Object.entries(stats.pagesByLanguage).forEach(([lang, count]) => {
  console.log(`     ${lang}: ${count} pages`);
});

// Calculate total URLs that will be in sitemap
const staticPages = 10; // Number of static pages
const totalStaticUrls = staticPages * stats.languages.length;
const totalUrls = totalStaticUrls + stats.totalPages;

console.log(`\n🌐 Total URLs in sitemap: ${totalUrls}`);
console.log(`   Static pages: ${totalStaticUrls}`);
console.log(`   Landing pages: ${stats.totalPages}`);