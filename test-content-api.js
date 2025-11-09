#!/usr/bin/env node

/**
 * Test script to verify if content API is accessible from Node.js build environment
 * This simulates what would be needed for sitemap generation using the kliv-content SDK approach
 */

console.log('🧪 Testing Content API access from Node.js build environment\n');

// Test 1: Try to fetch via the same API endpoint the SDK uses
console.log('1. Testing API endpoint that kliv-content.js uses...');

async function testContentApi() {
    try {
        console.log('   Fetching /api/v2/content...');
        const response1 = await fetch('http://localhost:5173/api/v2/content');
        
        if (!response1.ok) {
            console.log(`   ❌ API error: ${response1.status} ${response1.statusText}`);
            const errorData = await response1.text();
            console.log(`   📄 Error response: ${errorData.substring(0, 200)}...`);
        } else {
            const data1 = await response1.json();
            console.log(`   ✅ Found ${data1.files?.length || 0} files in root`);
        }
        
        console.log('   Fetching /api/v2/content?prefix=%2Fcontent%2Flanding-pages%2F...');
        const response2 = await fetch('http://localhost:5173/api/v2/content?prefix=%2Fcontent%2Flanding-pages%2F');
        
        if (!response2.ok) {
            console.log(`   ❌ API error: ${response2.status} ${response2.statusText}`);
        } else {
            const data2 = await response2.json();
            console.log(`   ✅ Found ${data2.files?.length || 0} files in landing-pages`);
        }

        // Test specifically for the it.js file you created
        console.log('   Fetching /api/v2/content?prefix=%2Fcontent%2Finspiration%2F...');
        const response3 = await fetch('http://localhost:5173/api/v2/content?prefix=%2Fcontent%2Finspiration%2F');
        
        if (!response3.ok) {
            console.log(`   ❌ API error: ${response3.status} ${response3.statusText}`);
        } else {
            const data3 = await response3.json();
            console.log(`   ✅ Found ${data3.files?.length || 0} files in inspiration`);
            
            // Look for it.js specifically
            const itFile = data3.files?.find(f => f.name === 'it.js');
            if (itFile) {
                console.log(`   🎉 Found it.js file! Path: ${it.path}, Size: ${it.size} bytes`);
            } else {
                console.log(`   🔍 Files in inspiration: ${data3.files?.map(f => f.name).join(', ') || 'none'}`);
            }
        }
        
    } catch (error) {
        console.log(`   ❌ Network error: ${error.message}`);
        console.log('   📝 This suggests dev server needs to be running for API access');
    }
}

// Test 2: Try to import the actual kliv-content.js SDK
console.log('\n2. Testing direct import of kliv-content.js SDK...');

try {
    const sdkPath = './src/lib/shared/kliv-content.js';
    
    // Dynamic import to load the ES module
    const sdkModule = await import(sdkPath);
    const { content } = sdkModule;
    
    console.log('   ✅ Successfully imported kliv-content.js SDK');
    console.log('   🔧 SDK has these methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(content)).filter(name => name !== 'constructor'));
    
    // Try to use the SDK (this will likely fail due to browser dependencies)
    console.log('   🌐 Testing SDK.listFiles()...');
    const result = await content.listFiles('/content/');
    console.log(`   ✅ SDK returned ${result.files?.length || 0} files`);
    
} catch (error) {
    console.log(`   ❌ SDK error: ${error.message}`);
    
    // Check if it's a fetch error (missing in Node.js <18)
    if (error.message.includes('fetch is not defined')) {
        console.log('   💡 Node.js version missing fetch - could use node-fetch or undici');
    } else if (error.message.includes('Unable to connect')) {
        console.log('   💡 Dev server not running - SDK needs server to be up');
    } else {
        console.log(`   🔍 Full error: ${error.stack?.split('\n')[0]}`);
    }
}

// Test 3: Check Node.js version and fetch availability
console.log('\n3. Checking Node.js environment...');

console.log(`   📦 Node.js version: ${process.version}`);
console.log(`   🌐 fetch available: ${typeof fetch !== 'undefined' ? '✅' : '❌'}`);

if (typeof fetch === 'undefined') {
    console.log('   💡 Could install node-fetch or undici to enable fetch in older Node versions');
}

// Test 4: Current build approach comparison
console.log('\n4. Comparing with current filesystem approach...');

try {
    const fs = await import('fs');
    const path = await import('path');
    
    const landingPath = path.join(process.cwd(), 'public', 'content', 'landing-pages');
    const inspirationPath = path.join(process.cwd(), 'public', 'content', 'inspiration');
    
    function countJsonFiles(dir) {
        let count = 0;
        const files = fs.readdirSync(dir);
        
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                count += countJsonFiles(fullPath);
            } else if (file.endsWith('.json')) {
                count++;
            }
        }
        
        return count;
    }
    
    if (fs.existsSync(landingPath)) {
        const jsonCount = countJsonFiles(landingPath);
        console.log(`   ✅ Current approach finds ${jsonCount} JSON files via filesystem`);
    }
    
    if (fs.existsSync(inspirationPath)) {
        const inspirationFiles = fs.readdirSync(inspirationPath);
        const hasItJs = inspirationFiles.includes('it.json');
        console.log(`   📁 Public inspiration files: ${inspirationFiles.join(', ')}`);
        console.log(`   🎉 it.json found via public filesystem: ${hasItJs ? '✅' : '❌'}`);
    }
    
    // Check the actual /content filesystem
    const actualContentPath = '/content/inspiration';
    console.log(`   🔍 Checking actual /content filesystem at: ${actualContentPath}`);
    
    try {
        const actualInspirationFiles = fs.readdirSync(actualContentPath);
        const hasItJsActual = actualInspirationFiles.includes('it.js');
        console.log(`   📁 Content inspiration files: ${actualInspirationFiles.join(', ')}`);
        console.log(`   🎉 it.js found via /content filesystem: ${hasItJsActual ? '✅' : '❌'}`);
    } catch (error) {
        console.log(`   ❌ Could not access /content filesystem: ${error.message}`);
    }
} catch (error) {
    console.log(`   ❌ Filesystem error: ${error.message}`);
}

// Test 5: Mock SDK functionality without browser dependencies
console.log('\n5. Testing SDK approach without browser dependencies...');

try {
    // Simulate what the SDK does but with Node.js HTTP client
    const listFiles = async (prefix) => {
        const normalizedPrefix = prefix || null;
        const url = normalizedPrefix
            ? `http://localhost:5173/api/v2/content?prefix=${encodeURIComponent(normalizedPrefix)}`
            : 'http://localhost:5173/api/v2/content';

        const response = await fetch(url, {
            method: 'GET'
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to list files');

        return data;
    };

    console.log('   🌐 Testing mocked SDK.listFiles("/content/inspiration/")...');
    const result = await listFiles('/content/inspiration/');
    console.log(`   📊 API response: ${result.files?.length || 0} files`);
    
} catch (error) {
    console.log(`   ❌ Mock SDK error: ${error.message}`);
}

// Execute the tests
console.log('\n🚀 Running tests...\n');
testContentApi().then(() => {
    console.log('\n📊 Test Summary:');
    console.log('   • If API fetch worked: Content API accessible from Node');
    console.log('   • If SDK import worked: SDK can be used in Node.js');
    console.log('   • If both failed: Stick with filesystem approach');
    console.log('\n💡 For build-time access: Either run dev server or use filesystem');
}).catch(console.error);