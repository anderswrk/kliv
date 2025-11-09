#!/usr/bin/env node

/**
 * Test script to verify if content API is accessible from Node.js build environment
 * This simulates what would be needed for sitemap generation
 */

console.log('🧪 Testing Content API access from Node.js build environment\n');

// Test 1: Try to fetch via HTTP (simulating what the frontend SDK does)
console.log('1. Testing HTTP fetch to content API endpoints...');

async function testHttpFetch() {
    try {
        console.log('   Fetching /content...');
        const response1 = await fetch('http://localhost:5173/content');
        
        if (!response1.ok) {
            console.log(`   ❌ HTTP error: ${response1.status} ${response1.statusText}`);
        } else {
            const data1 = await response1.text();
            console.log(`   ✅ Response: ${data1.substring(0, 100)}...`);
        }
        
        console.log('   Fetching /content/landing-pages/en...');
        const response2 = await fetch('http://localhost:5173/content/landing-pages/en');
        
        if (!response2.ok) {
            console.log(`   ❌ HTTP error: ${response2.status} ${response2.statusText}`);
        } else {
            const data2 = await response2.json();
            console.log(`   ✅ Found ${Object.keys(data2).length} directories/files in English section`);
        }
    } catch (error) {
        console.log(`   ❌ Network error: ${error.message}`);
        console.log('   📝 This suggests dev server needs to be running for API access');
    }
}

// Test 2: Try to import kliv-content.js directly
console.log('\n2. Testing direct import of kliv-content.js...');

try {
    // Check if the SDK file exists
    const fs = await import('fs');
    const path = await import('path');
    
    const sdkPath = path.join(process.cwd(), 'public', 'sdk', 'kliv-content.js');
    if (fs.existsSync(sdkPath)) {
        console.log(`   ✅ SDK file exists at: ${sdkPath}`);
        
        // Try to read it
        const sdkContent = fs.readFileSync(sdkPath, 'utf8');
        console.log(`   📄 SDK file size: ${sdkContent.length} characters`);
        console.log(`   🔍 First 200 chars: ${sdkContent.substring(0, 200)}...`);
    } else {
        console.log(`   ❌ SDK file not found at: ${sdkPath}`);
    }
} catch (error) {
    console.log(`   ❌ File system error: ${error.message}`);
}

// Test 3: Simulate browser environment requirements
console.log('\n3. Analyzing SDK dependencies...');

try {
    const fs = await import('fs');
    const path = await import('path');
    
    const sdkPath = path.join(process.cwd(), 'public', 'sdk', 'kliv-content.js');
    if (fs.existsSync(sdkPath)) {
        const sdkContent = fs.readFileSync(sdkPath, 'utf8');
        
        // Look for browser-specific dependencies
        const hasFetch = sdkContent.includes('fetch');
        const hasWindow = sdkContent.includes('window');
        const hasDocument = sdkContent.includes('document');
        const hasLocalStorage = sdkContent.includes('localStorage');
        
        console.log(`   🌐 Uses fetch API: ${hasFetch ? '✅' : '❌'}`);
        console.log(`   🖥️  Uses window object: ${hasWindow ? '✅' : '❌'}`);
        console.log(`   📄 Uses document object: ${hasDocument ? '✅' : '❌'}`);
        console.log(`   💾 Uses localStorage: ${hasLocalStorage ? '✅' : '❌'}`);
        
        if (hasFetch && !hasWindow && !hasDocument && !hasLocalStorage) {
            console.log('   💡 SDK might be Node.js compatible');
        } else {
            console.log('   ⚠️  SDK appears to be browser-dependent');
        }
    }
} catch (error) {
    console.log(`   ❌ Analysis error: ${error.message}`);
}

// Test 4: Current build approach comparison
console.log('\n4. Comparing with current filesystem approach...');

try {
    const fs = await import('fs');
    const path = await import('path');
    
    const landingPath = path.join(process.cwd(), 'public', 'content', 'landing-pages');
    
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
    } else {
        console.log(`   ❌ Landing pages directory not found: ${landingPath}`);
    }
} catch (error) {
    console.log(`   ❌ Filesystem error: ${error.message}`);
}

// Execute the tests
console.log('\n🚀 Running tests...\n');
testHttpFetch().then(() => {
    console.log('\n📊 Test Summary:');
    console.log('   • If HTTP fetch worked: API is accessible from Node');
    console.log('   • If HTTP fetch failed: API only works in browser');
    console.log('   • Current filesystem approach: Always works in Node');
    console.log('\n💡 Recommendation: Stick with filesystem approach for sitemap generation');
}).catch(console.error);