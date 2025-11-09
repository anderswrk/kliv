import { useEffect, useState } from 'react';
import db from '@/lib/shared/kliv-database';
import { Helmet } from 'react-helmet-async';

interface Category {
  slug: string;
}

interface Page {
  slug: string;
  category_name: string;
}

export default function Sitemap() {
  const [sitemap, setSitemap] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateSitemap();
  }, []);

  const generateSitemap = async () => {
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const BASE_URL = 'https://kliv.dev';

      console.log('Starting sitemap generation...');
      
      // Get all categories and pages from database
      console.log('Querying database for categories and pages...');
      const [categories, pages] = await Promise.all([
        db.query('landing_categories'),
        db.query('landing_pages')
      ]);

      console.log('Database query results:', {
        categoriesCount: categories?.length || 0,
        pagesCount: pages?.length || 0
      });

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
      categories.forEach((category: Category) => {
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
      pages.forEach((page: Page) => {
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

      setSitemap(sitemapXml);

      // Set proper content type for the response
      document.contentType = 'application/xml';
      
    } catch (error) {
      console.error('Failed to generate sitemap:', error);
      console.log('Detailed error:', error.message);
      console.log('Error stack:', error.stack);
      console.log('Using fallback minimal sitemap due to database query failure');
      // Fallback to minimal sitemap
      setSitemap(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://kliv.dev/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  // Set the content type and render the XML
  if (typeof document !== 'undefined') {
    // In browser, serve the XML directly
    document.open();
    document.write(sitemap);
    document.close();
    return null;
  }

  return (
    <Helmet>
      <title>Sitemap</title>
      <meta httpEquiv="Content-Type" content="text/xml; charset=utf-8" />
    </Helmet>
  );
}