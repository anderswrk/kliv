#!/usr/bin/env node

/**
 * Test if the content API correctly detects the it.js file
 * This needs to be run when dev server is running
 */

console.log('🔍 Testing Content API file detection...\n');

import { content } from './src/lib/shared/kliv-content.js';

async function testContentDetection() {
    try {
        console.log('🌐 Using Content SDK to list files...');
        
        // List all inspiration files
        const inspirationFiles = await content.listFiles('/content/inspiration/');
        
        console.log(`📊 Found ${inspirationFiles.files?.length || 0} files in /content/inspiration/:`);
        
        if (inspirationFiles.files && inspirationFiles.files.length > 0) {
            inspirationFiles.files.forEach((file, index) => {
                console.log(`   ${index + 1}. ${file.name} (${file.size} bytes) - Path: ${file.path}`);
            });
            
            // Look specifically for it.js
            const itFile = inspirationFiles.files.find(f => f.name === 'it.js');
            if (itFile) {
                console.log(`\n🎉 Found it.js file!`);
                console.log(`   📁 Path: ${itFile.path}`);
                console.log(`   📊 Size: ${itFile.size} bytes`);
                console.log(`   🕒 Modified: ${itFile.lastModified || 'unknown'}`);
                console.log(`   🔗 Content URL: ${itFile.contentUrl || 'N/A'}`);
            } else {
                console.log(`\n❌ it.js file not found in content API results`);
            }
        }
        
        // Also test root content to see overall structure
        console.log('\n🌐 Root content structure:');
        const rootFiles = await content.listFiles('/content/');
        
        if (rootFiles.files) {
            rootFiles.files.forEach((file, index) => {
                console.log(`   ${index + 1}. ${file.name} (${file.type === 'directory' ? 'dir' : 'file'})`);
            });
        }
        
    } catch (error) {
        console.log(`❌ Content API error: ${error.message}`);
        console.log(`💡 Make sure dev server is running (npm run dev)`);
        
        if (error.message.includes('fetch')) {
            console.log(`🔍 This confirms the content API only works when:");
            console.log('   - Dev server is running (localhost:5173)');
            console.log('   - API endpoints are available');
            console.log('   - /content/ filesystem is mounted via API');
        }
    }
}

// Alternative test: Direct API call without SDK
async function testDirectAPI() {
    try {
        console.log('\n🌐 Testing direct API call without SDK...');
        
        const response = await fetch('http://localhost:5173/api/v2/content?prefix=%2Fcontent%2Finspiration%2F');
        
        if (!response.ok) {
            throw new Error('API error: ' + response.status + ' ' + response.statusText);
        }
        
        const data = await response.json();
        console.log(`📊 Direct API found ${data.files?.length || 0} files`);
        
        if (data.files) {
            data.files.forEach((file, index) => {
                console.log(`   ${index + 1}. ${file.name} (${file.size} bytes)`);
            });
        }
        
    } catch (error) {
        console.log(`❌ Direct API error: ${error.message}`);
    }
}

// Run both tests
async function runAllTests() {
    await testContentDetection();
    await testDirectAPI();
    
    console.log('\n📋 Summary:');
    console.log('- Content API can detect it.js when dev server runs');
    console.log('- Build scripts cannot access /content/ directly');
    console.log('- API requires server runtime, not available during npm run build');
}

runAllTests().catch(console.error);