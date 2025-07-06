import { useEffect, useState, useRef } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ArrowRight, MessageSquare, Copy, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface LandingPageContent {
  title: string;
  description: string;
  metaDescription: string;
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    image?: string;
  };
  sections: Array<{
    type: 'text' | 'features' | 'benefits' | 'cta' | 'markdown' | 'prompt-examples' | 'improvement-ideas' | 'faq';
    title?: string;
    content?: string;
    image?: string;
    items?: Array<{
      title?: string;
      description?: string;
      icon?: string;
      prompt?: string;
      question?: string;
      answer?: string;
    }>;
  }>;
  defaultPrompt?: string;
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
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
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
        
        // Set default prompt if available
        if (data.defaultPrompt && !message) {
          setMessage(data.defaultPrompt);
        }
        
        // Update page title and meta description
        document.title = `${data.title} | Kliv`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', data.metaDescription);
        }

        // Add structured data for SEO
        const structuredData = {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": data.title,
          "description": data.metaDescription,
          "url": window.location.href,
          "mainEntity": {
            "@type": "SoftwareApplication",
            "name": "Kliv AI Platform",
            "applicationCategory": "DeveloperApplication",
            "description": data.description,
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          }
        };

        // Add FAQ structured data if FAQ section exists
        const faqSection = data.sections.find(section => section.type === 'faq');
        if (faqSection && faqSection.items) {
          structuredData.mainEntity = {
            "@type": "FAQPage",
            "mainEntity": faqSection.items.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          };
        }

        // Remove existing structured data
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript) {
          existingScript.remove();
        }

        // Add new structured data
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);

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

  const copyPrompt = (prompt: string) => {
    setMessage(prompt);
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Focus the textarea after a short delay to allow scroll to complete
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 500);
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const renderSection = (section: LandingPageContent['sections'][0], index: number) => {
    switch (section.type) {
      case 'text':
        return (
          <section key={index} className="py-16">
            <div className="container mx-auto px-4">
              {section.title && (
                <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
                  {section.title}
                </h2>
              )}
              <div className="max-w-6xl mx-auto">
                <div className={`grid gap-12 items-center ${section.image ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
                  <div className={section.image ? '' : 'max-w-4xl mx-auto'}>
                    {section.content && (
                      <div className="text-lg text-muted-foreground leading-relaxed">
                        {section.content.split('\n').map((paragraph, i) => (
                          <p key={i} className="mb-4">{paragraph}</p>
                        ))}
                      </div>
                    )}
                  </div>
                  {section.image && (
                    <div className="order-first lg:order-last">
                      <img
                        src={section.image}
                        alt={section.title || 'Section illustration'}
                        className="w-full h-auto rounded-lg shadow-lg"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* Add attribution text after the first text section */}
              {index === 0 && (
                <div className="max-w-4xl mx-auto mt-8 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground italic text-center">
                    {t('landing.attribution', 'This content was generated by Kliv AI, drawing on 20+ product patterns across the workflow automation sector we\'ve built for customers.')}
                  </p>
                </div>
              )}
            </div>
          </section>
        );

      case 'markdown':
        return (
          <section key={index} className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              {section.title && (
                <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
                  {section.title}
                </h2>
              )}
              <div className="max-w-6xl mx-auto">
                <div className={`grid gap-12 items-start ${section.image ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
                  <div className={section.image ? '' : 'max-w-4xl mx-auto'}>
                    {section.content && (
                      <div className="prose prose-lg dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {section.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                  {section.image && (
                    <div className="lg:sticky lg:top-8">
                      <img
                        src={section.image}
                        alt={section.title || 'Section illustration'}
                        className="w-full h-auto rounded-lg shadow-lg"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );

      case 'prompt-examples':
        return (
          <section key={index} className="py-16">
            <div className="container mx-auto px-4">
              {section.title && (
                <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
                  {section.title}
                </h2>
              )}
              <div className="max-w-6xl mx-auto">
                <div className={`grid gap-12 items-start ${section.image ? 'lg:grid-cols-3' : 'lg:grid-cols-1'}`}>
                  <div className={section.image ? 'lg:col-span-2' : ''}>
                    {section.items && (
                      <div className="grid md:grid-cols-2 gap-6">
                        {section.items.map((item, i) => (
                          <Card key={i} className="p-6 bg-card border hover:border-primary/30 transition-all duration-200">
                            <h3 className="text-xl font-semibold mb-3 text-foreground">
                              {item.title}
                            </h3>
                            <p className="text-muted-foreground mb-4 text-sm">
                              {item.description}
                            </p>
                            <div className="bg-muted/50 p-4 rounded-lg mb-4">
                              <p className="text-sm text-muted-foreground italic">
                                "{item.prompt}"
                              </p>
                            </div>
                            <Button
                              onClick={() => copyPrompt(item.prompt || '')}
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              {t('landing.usePrompt', 'Use this prompt')}
                            </Button>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                  {section.image && (
                    <div className="lg:sticky lg:top-8">
                      <img
                        src={section.image}
                        alt={section.title || 'Section illustration'}
                        className="w-full h-auto rounded-lg shadow-lg"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );

      case 'improvement-ideas':
        return (
          <section key={index} className="py-16 bg-muted/20">
            <div className="container mx-auto px-4">
              {section.title && (
                <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
                  {section.title}
                </h2>
              )}
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                {t('landing.improvementDescription', 'Once you have your basic automation tool, you can enhance it with these additional features')}
              </p>
              {section.items && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                  {section.items.map((item, i) => (
                    <Card key={i} className="p-4 bg-card border border-dashed border-muted-foreground/30">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-foreground mb-2 text-sm">
                            {item.title}
                          </h4>
                          <p className="text-xs text-muted-foreground italic">
                            "{item.prompt}"
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'features':
        return (
          <section key={index} className="py-16 bg-muted/50">
            <div className="container mx-auto px-4">
              {section.title && (
                <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
                  {section.title}
                </h2>
              )}
              <div className="max-w-6xl mx-auto">
                <div className={`grid gap-12 items-start ${section.image ? 'lg:grid-cols-3' : 'lg:grid-cols-1'}`}>
                  <div className={section.image ? 'lg:col-span-2' : ''}>
                    {section.items && (
                      <div className="grid md:grid-cols-2 gap-8">
                        {section.items.map((item, i) => (
                          <div key={i} className="bg-card p-6 rounded-lg shadow-sm border">
                            {item.icon && (
                              <div className="text-4xl mb-4">{item.icon}</div>
                            )}
                            <h3 className="text-xl font-semibold mb-3 text-foreground">
                              {item.title}
                            </h3>
                            <p className="text-muted-foreground">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {section.image && (
                    <div className="lg:sticky lg:top-8">
                      <img
                        src={section.image}
                        alt={section.title || 'Section illustration'}
                        className="w-full h-auto rounded-lg shadow-lg"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );

      case 'faq':
        return (
          <section key={index} className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              {section.title && (
                <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
                  {section.title}
                </h2>
              )}
              {section.items && (
                <div className="max-w-4xl mx-auto space-y-4">
                  {section.items.map((item, i) => (
                    <Card key={i} className="bg-card border">
                      <button
                        onClick={() => toggleFaq(i)}
                        className="w-full p-6 text-left flex justify-between items-center hover:bg-muted/20 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-foreground pr-4">
                          {item.question}
                        </h3>
                        {expandedFaq === i ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                      </button>
                      {expandedFaq === i && (
                        <div className="px-6 pb-6">
                          <p className="text-muted-foreground leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </Card>
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
                <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
                  {section.title}
                </h2>
              )}
              {section.items && (
                <div className="max-w-4xl mx-auto">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-start mb-8">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <span className="text-primary font-semibold">{i + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground">{item.description}</p>
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
          <section key={index} className="py-16 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              {section.title && (
                <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
              )}
              {section.content && (
                <p className="text-xl mb-8 opacity-90">{section.content}</p>
              )}
              <a
                href={`/${lang}/signup`}
                className="inline-block bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors"
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh] pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !content) {
    return <Navigate to={`/${lang}/404`} replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with optional hero image */}
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className={`grid gap-12 items-center ${content?.hero.image ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
            <div className={`text-center ${content?.hero.image ? 'lg:text-left' : ''}`}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient">
                  {content?.hero.title}
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto lg:mx-0">
                {content?.hero.subtitle}
              </p>

              {/* Text Input Box from Hero Section */}
              <div className="max-w-4xl mx-auto lg:mx-0">
                <Card className="p-8 bg-card border-2 border-border hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="space-y-6">
                    {/* Input Label */}
                    <div className="flex items-center gap-2 text-left">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <label className="text-sm font-medium text-foreground">
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
                        className="min-h-[140px] text-lg resize-none border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 rounded-lg p-4"
                      />
                      {message.length > 0 && (
                        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                          {message.length} {t('hero.charactersCount')}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-center">
                      <Button
                        onClick={handleStartBuilding}
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 min-w-[160px]"
                      >
                        {content?.hero.cta}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            
            {/* Hero Image */}
            {content?.hero.image && (
              <div className="order-first lg:order-last">
                <img
                  src={content.hero.image}
                  alt={content.hero.title}
                  className="w-full h-auto rounded-lg shadow-xl"
                  loading="eager"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Dynamic Sections */}
      {content?.sections.map((section, index) => renderSection(section, index))}

      <Footer />
    </div>
  );
}