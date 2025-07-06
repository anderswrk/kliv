import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface LandingPageContent {
  title: string;
  description: string;
  metaDescription: string;
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  sections: Array<{
    type: 'text' | 'features' | 'benefits' | 'cta';
    title?: string;
    content?: string;
    items?: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
  }>;
}

export function DynamicLandingPage() {
  const { lang, category, subcategory } = useParams<{
    lang: string;
    category: string;
    subcategory: string;
  }>();
  const { t } = useTranslation();
  const [content, setContent] = useState<LandingPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(false);
        
        // Construct the path for the JSON file
        const contentPath = subcategory 
          ? `${category}/${subcategory}`
          : category;
        
        const response = await fetch(`/content/landing-pages/${lang}/${contentPath}.json`);
        
        if (!response.ok) {
          throw new Error('Content not found');
        }
        
        const data = await response.json();
        setContent(data);
        
        // Update page title and meta description
        document.title = `${data.title} | Kliv`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', data.metaDescription);
        }
      } catch (err) {
        console.error('Failed to load landing page content:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      loadContent();
    }
  }, [lang, category, subcategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !content) {
    return <Navigate to={`/${lang}/404`} replace />;
  }

  const renderSection = (section: LandingPageContent['sections'][0], index: number) => {
    switch (section.type) {
      case 'text':
        return (
          <section key={index} className="py-16">
            <div className="container mx-auto px-4">
              {section.title && (
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
                  {section.title}
                </h2>
              )}
              {section.content && (
                <div className="max-w-4xl mx-auto text-lg text-gray-600 leading-relaxed">
                  {section.content.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'features':
        return (
          <section key={index} className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              {section.title && (
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                  {section.title}
                </h2>
              )}
              {section.items && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {section.items.map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                      {item.icon && (
                        <div className="text-4xl mb-4">{item.icon}</div>
                      )}
                      <h3 className="text-xl font-semibold mb-3 text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'benefits':
        return (
          <section key={index} className="py-16">
            <div className="container mx-auto px-4">
              {section.title && (
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                  {section.title}
                </h2>
              )}
              {section.items && (
                <div className="max-w-4xl mx-auto">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-start mb-8">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-purple-600 font-semibold">{i + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'cta':
        return (
          <section key={index} className="py-16 bg-purple-600 text-white">
            <div className="container mx-auto px-4 text-center">
              {section.title && (
                <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
              )}
              {section.content && (
                <p className="text-xl mb-8 opacity-90">{section.content}</p>
              )}
              <a
                href={`/${lang}/signup`}
                className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {t('Get Started Free')}
              </a>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            {content.hero.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {content.hero.subtitle}
          </p>
          <a
            href={`/${lang}/signup`}
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            {content.hero.cta}
          </a>
        </div>
      </section>

      {/* Dynamic Sections */}
      {content.sections.map((section, index) => renderSection(section, index))}

      <Footer />
    </div>
  );
}