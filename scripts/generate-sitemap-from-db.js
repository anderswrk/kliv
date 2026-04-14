#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { readFileSync } from 'fs';
import https from 'https';

const BASE_URL = 'https://kliv.dev';
const currentDate = new Date().toISOString().split('T')[0];

// Supported languages
const LANGUAGES = ['en', 'ja', 'sv'];

// Static pages
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
  'login',
  'inspiration'
];

function makeHttpsRequest(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
    request.on('error', (error) => {
      reject(error);
    });
  });
}

async function generateSitemap() {
  console.log('🗂️  Generating sitemap from database...');
  
  try {
    // Get all categories and pages from database via HTTPS API
    const devApiBase = 'https://kliv.kliv.site/api/v2/database';
    
    const [categories, pages] = await Promise.all([
      makeHttpsRequest(`${devApiBase}/landing_categories`),
      makeHttpsRequest(`${devApiBase}/landing_pages`)
    ]);

    console.log(`📊 Found ${categories.length} categories and ${pages.length} pages`);

    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add static pages for each language
    LANGUAGES.forEach(lang => {
      STATIC_PAGES.forEach(page => {
        const url = page === '' ? `${BASE_URL}/${lang}` : `${BASE_URL}/${lang}/${page}`;
        const priority = page === '' ? '1.0' : '0.8';

        sitemapXml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
      });
    });

    // Add category pages
    categories.forEach(category => {
      LANGUAGES.forEach(lang => {
        const url = `${BASE_URL}/${lang}/inspiration/${category.slug}`;
        sitemapXml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      });
    });

    // Add landing pages
    pages.forEach(page => {
      // Convert category name to slug format
      const categorySlug = page.category_name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      LANGUAGES.forEach(lang => {
        const url = `${BASE_URL}/${lang}/${categorySlug}/${page.slug}`;
        sitemapXml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      });
    });

    sitemapXml += `
</urlset>`;

    // Write sitemap to public directory
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapXml);

    console.log('✅ Sitemap generated successfully!');
    console.log(`📍 Location: ${sitemapPath}`);
    console.log(`📊 Summary:`);
    console.log(`- Static pages: ${STATIC_PAGES.length * LANGUAGES.length}`);
    console.log(`- Category pages: ${categories.length * LANGUAGES.length}`);
    console.log(`- Landing pages: ${pages.length * LANGUAGES.length}`);

  } catch (error) {
    console.error('❌ Failed to generate sitemap:', error);
    // Create minimal fallback sitemap
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
    
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    fs.writeFileSync(sitemapPath, fallbackSitemap);
    
    console.log('⚠️  Generated minimal fallback sitemap due to database error');
    console.log(`📍 Location: ${sitemapPath}`);
  }
}

generateSitemap();