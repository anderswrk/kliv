import { useEffect, useState, useRef } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ArrowRight, MessageSquare } from 'lucide-react';

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
  const navigate = useNavigate();
  const [content, setContent] = useState<LandingPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const handleStartBuilding = () => {
    // Navigate to the signup page with the prompt as a URL parameter
    const params = new URLSearchParams();
    if (message.trim()) {
      params.set('prompt', message.trim());
    }
    
    const queryString = params.toString();
    const url = queryString ? `/${lang}/signup?${queryString}` : `/${lang}/signup`;
    
    navigate(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh] pt-20">
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
      
      {/* Hero Section with proper spacing */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            {content.hero.title}
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            {content.hero.subtitle}
          </p>

          {/* Text Input Box from Hero Section */}
          <div className="max-w-2xl mx-auto mb-8">
            <Card className="p-8 bg-white border-2 border-gray-200 hover:border-purple-300 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="space-y-6">
                {/* Input Label */}
                <div className="flex items-center gap-2 text-left">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                  <label className="text-sm font-medium text-gray-900">
                    {t('hero.inputLabel')}
                  </label>
                </div>
                
                {/* Text Input */}
                <div className="relative">
                  <Textarea
                    ref={textareaRef}
                    placeholder={t('hero.placeholder')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[120px] text-lg resize-none border-2 border-gray-200 bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 rounded-lg p-4"
                  />
                  {message.length > 0 && (
                    <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                      {message.length} {t('hero.charactersCount')}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center">
                  <Button
                    onClick={handleStartBuilding}
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 min-w-[160px]"
                  >
                    {content.hero.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Dynamic Sections */}
      {content.sections.map((section, index) => renderSection(section, index))}

      <Footer />
    </div>
  );
}