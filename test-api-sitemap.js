#!/usr/bin/env node

/**
 * Test sitemap generation using content API vs filesystem
 * This demonstrates both approaches for sitemap generation
 */

console.log('🗺️  Testing sitemap generation approaches...\n');

// Import the SDK
import { content } from './src/lib/shared/kliv-content.js';

// Approach 1: Try content API first
async function generateSitemapWithAPI() {
    try {
        console.log('🌐 Attempting sitemap generation via Content API...');
        
        // Get all landing pages via API
        const landingResponse = await content.listFiles('/content/landing-pages/');
        const landingFiles = landingResponse.files || [];
        
        console.log(`   📊 Found ${landingFiles.length} files via API`);
        
        // Filter for JSON files (landing pages)
        const jsonFiles = landingFiles.filter(file => 
            file.name.endsWith('.json') && 
            file.path.includes('/en/') // Focus on English for this test
        );
        
        console.log(`   📄 Found ${jsonFiles.length} English JSON files via API`);
        
        // Generate sitemap entries
        const sitemapEntries = jsonFiles.map(file => {
            const slug = file.name.replace('.json', '');
            const path = file.path.replace('/content/landing-pages/en/', '').replace('.json', '');
            
            return {
                url: `https://kliv.kliv.site/${path}`,
                lastmod: file.lastModified || new Date().toISOString(),
                changefreq: 'weekly',
                priority: 0.8
            };
        });
        
        console.log(`   ✅ Generated ${sitemapEntries.length} sitemap entries via API`);
        return sitemapEntries;
        
    } catch (error) {
        console.log(`   ❌ API approach failed: ${error.message}`);
        return null;
    }
}

// Approach 2: Current filesystem approach
async function generateSitemapWithFilesystem() {
    try {
        console.log('💾 Attempting sitemap generation via filesystem...');
        
        const fs = await import('fs');
        const path = await import('path');
        
        const landingPath = path.join(process.cwd(), 'public', 'content', 'landing-pages', 'en');
        
        if (!fs.existsSync(landingPath)) {
            throw new Error('Landing pages directory not found');
        }
        
        const jsonFiles = [];
        
        function scanDirectory(dir, basePath = '') {
            const items = fs.readdirSync(dir);
            
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    scanDirectory(fullPath, path.join(basePath, item));
                } else if (item.endsWith('.json')) {
                    jsonFiles.push({
                        name: item,
                        path: path.join(basePath, item),
                        fullPath: fullPath
                    });
                }
            }
        }
        
        scanDirectory(landingPath);
        
        console.log(`   📊 Found ${jsonFiles.length} English JSON files via filesystem`);
        
        // Generate sitemap entries
        const sitemapEntries = jsonFiles.map(file => {
            const slug = file.name.replace('.json', '');
            const urlPath = file.path.replace('.json', '');
            
            return {
                url: `https://kliv.kliv.site/${urlPath}`,
                lastmod: fs.statSync(file.fullPath).mtime.toISOString(),
                changefreq: 'weekly',
                priority: 0.8
            };
        });
        
        console.log(`   ✅ Generated ${sitemapEntries.length} sitemap entries via filesystem`);
        return sitemapEntries;
        
    } catch (error) {
        console.log(`   ❌ Filesystem approach failed: ${error.message}`);
        return null;
    }
}

// Comparison function
async function compareApproaches() {
    const apiResults = await generateSitemapWithAPI();
    const fsResults = await generateSitemapWithFilesystem();
    
    console.log('\n📊 Approach Comparison:');
    
    if (apiResults && fsResults) {
        const apiCount = apiResults.length;
        const fsCount = fsResults.length;
        
        console.log(`   API approach:      ${apiCount} entries`);
        console.log(`   Filesystem approach: ${fsCount} entries`);
        
        if (apiCount === fsCount) {
            console.log('   ✅ Both approaches yield same result');
        } else {
            console.log(`   ⚠️  Results differ by ${Math.abs(apiCount - fsCount)} entries`);
        }
        
        // Show first few examples
        console.log('\n   Sample entries from filesystem:');
        fsResults.slice(0, 3).forEach((entry, i) => {
            console.log(`     ${i + 1}. ${entry.url}`);
        });
        
    } else {
        console.log('   ❌ At least one approach failed - see errors above');
    }
    
    console.log('\n💡 Recommendations:');
    if (apiResults) {
        console.log('   ✅ API works when dev server is running');
        console.log('   🔄 Good for debugging/development');
    }
    
    if (fsResults) {
        console.log('   ✅ Filesystem always works in build environment');
        console.log('   🏗️  Recommended for production builds');
    }
    
    console.log('\n🎯 Final recommendation: Use filesystem for builds, API for runtime');
}

// Run the comparison
compareApproaches().catch(console.error);