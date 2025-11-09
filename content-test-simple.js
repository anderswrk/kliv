#!/usr/bin/env node

// Simple test to verify content API access
console.log('🔍 Testing Content API for it.js detection...\n');

import { content } from './src/lib/shared/kliv-content.js';

async function test() {
    try {
        console.log('🌐 Checking /content/inspiration/ for it.js...');
        const result = await content.listFiles('/content/inspiration/');
        console.log('📊 Files found:', result.files?.length || 0);
        
        if (result.files) {
            result.files.forEach((file, i) => {
                console.log(`   ${i+1}. ${file.name} (${file.size} bytes)`);
            });
            
            const itFile = result.files.find(f => f.name === 'it.js');
            console.log('\n🎉 it.js found:', !!itFile);
            if (itFile) {
                console.log('   Path:', itFile.path);
                console.log('   Size:', itFile.size);
            }
        }
    } catch (error) {
        console.log('❌ Error:', error.message);
        console.log('💡 Dev server needs to be running for API access');
    }
}

test().catch(console.error);