import React, { useEffect, useState, useRef } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ArrowRight, MessageSquare, Copy, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';
import db from '@/lib/shared/kliv-database';

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
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isTranslatedFromEnglish, setIsTranslatedFromEnglish] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Get prompt examples from the content
  const getPromptExamples = () => {
    if (!content) return [];
    
    const promptSection = content.sections.find(section => section.type === 'prompt-examples');
    if (!promptSection?.items) return [];
    
    return promptSection.items
      .filter(item => item.title && item.prompt)
      .map(item => ({
        short: item.title!,
        full: item.prompt!
      }));
  };

  const promptExamples = getPromptExamples();
  
  // Create typing examples from prompt examples
  const typingTexts = promptExamples.map(example => example.full);
  
  const { displayText, stopAnimation, startAnimation, isActive } = useTypingAnimation({
    texts: typingTexts,
    typingSpeed: 80,
    deletingSpeed: 40,
    pauseDuration: 2000,
    loop: true
  });

  // Helper function to format category names for display
  const formatCategoryName = (categorySlug: string) => {
    return categorySlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Helper function to get category display name with proper formatting
  const getCategoryDisplayName = (categorySlug: string) => {
    const formatted = formatCategoryName(categorySlug);
    // Handle special cases for better readability
    const specialCases: Record<string, string> = {
      'ai-and-machine-learning': 'AI & Machine Learning',
      'e-commerce-management': 'E-commerce Management',
      'crm-customer-relationship-management': 'CRM & Customer Relationship Management',
      'civic-and-government-tools': 'Civic & Government Tools',
      'no-code-and-automation-tools': 'No-Code & Automation Tools',
      'business-and-portfolio-websites': 'Business & Portfolio Websites',
      'health-and-wellness': 'Health & Wellness',
      'financial-services-and-banking': 'Financial Services & Banking',
      'media-and-entertainment': 'Media & Entertainment',
      'educational-tools': 'Educational Tools',
      'productivity-tools': 'Productivity Tools',
      'website-building': 'Website Building',
      'gaming-and-entertainment': 'Gaming & Entertainment',
      'social-media-management': 'Social Media Management',
      'sports-and-recreation': 'Sports & Recreation',
      'travel-and-tourism': 'Travel & Tourism',
      'real-estate-management': 'Real Estate Management',
      'healthcare': 'Healthcare',
      'restaurant-and-food-service': 'Restaurant & Food Service',
      'inventory-management': 'Inventory Management',
      'employee-and-hr-management': 'Employee & HR Management',
      'project-management-and-collaboration': 'Project Management & Collaboration',
      'transportation-and-logistics': 'Transportation & Logistics',
      'security-and-surveillance': 'Security & Surveillance',
      'sustainability-and-environment': 'Sustainability & Environment'
    };
    
    return specialCases[categorySlug] || formatted;
  };

  // Generate breadcrumb items
  const getBreadcrumbItems = () => {
    const items = [];
    
    if (category) {
      const categoryDisplayName = getCategoryDisplayName(category);
      
      if (subcategory) {
        // If we have a subcategory, add category as intermediate step
        items.push({
          label: categoryDisplayName,
          href: `/${lang}/inspiration/${category}` // Link to the new CategoryPage
        });
        items.push({
          label: content?.title || formatCategoryName(subcategory)
        });
      } else {
        // If no subcategory, this is the final category page
        items.push({
          label: content?.title || categoryDisplayName
        });
      }
    }
    
    return items;
  };

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(false);
        
        // Get the slug for the specific page
        const pageSlug = subcategory || category;
        
        if (!pageSlug) {
          throw new Error('Missing page slug');
        }
        
        // Fetch from database directly with language filter
        const currentLang = lang || 'en';
        const pages = await db.query('landing_pages', {
          slug: `eq.${pageSlug}`,
          language: `eq.${currentLang}`
        });
        
        // If no content found in current language, try English as fallback
        let pageData = null;
        let usingFallback = false;
        if (Array.isArray(pages) && pages.length > 0) {
          pageData = pages[0];
        } else if (currentLang !== 'en') {
          // Try English fallback
          const englishPages = await db.query('landing_pages', {
            slug: `eq.${pageSlug}`,
            language: 'eq.en'
          });
          if (Array.isArray(englishPages) && englishPages.length > 0) {
            pageData = englishPages[0];
            usingFallback = true;
          }
        }
        
        if (!pageData) {
          throw new Error('No content found');
        }
        
        setIsTranslatedFromEnglish(usingFallback);
        
        // Parse the sections JSON
        let parsedSections = [];
        try {
          parsedSections = JSON.parse(pageData.sections || '[]');
        } catch (e) {
          console.error('Error parsing sections:', e);
        }
        
        // Transform data to match expected interface
        const transformedData: LandingPageContent = {
          title: pageData.title,
          description: pageData.description,
          metaDescription: pageData.meta_description || pageData.description,
          hero: {
            title: pageData.hero_title || pageData.title,
            subtitle: pageData.hero_subtitle || pageData.description,
            cta: pageData.hero_cta || 'Start Building'
          },
          sections: parsedSections,
          defaultPrompt: pageData.default_prompt
        };
        
        setContent(transformedData);
        
        // Set default prompt if available
        if (transformedData.defaultPrompt && !message) {
          setMessage(transformedData.defaultPrompt);
        }
        
        // Update page title and meta description
        document.title = `${transformedData.title} | Kliv`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', transformedData.metaDescription);
        }

        // Add OpenGraph meta tags
        const updateOrCreateMetaTag = (property: string, content: string) => {
          let metaTag = document.querySelector(`meta[property="${property}"]`);
          if (!metaTag) {
            metaTag = document.createElement('meta');
            metaTag.setAttribute('property', property);
            document.head.appendChild(metaTag);
          }
          metaTag.setAttribute('content', content);
        };

        const updateOrCreateNameMetaTag = (name: string, content: string) => {
          let metaTag = document.querySelector(`meta[name="${name}"]`);
          if (!metaTag) {
            metaTag = document.createElement('meta');
            metaTag.setAttribute('name', name);
            document.head.appendChild(metaTag);
          }
          metaTag.setAttribute('content', content);
        };

        // OpenGraph tags
        updateOrCreateMetaTag('og:title', transformedData.title);
        updateOrCreateMetaTag('og:description', transformedData.metaDescription);
        updateOrCreateMetaTag('og:url', window.location.href);
        updateOrCreateMetaTag('og:type', 'website');
        updateOrCreateMetaTag('og:site_name', 'Kliv');
        
        // Twitter Card tags
        updateOrCreateNameMetaTag('twitter:card', 'summary_large_image');
        updateOrCreateNameMetaTag('twitter:title', transformedData.title);
        updateOrCreateNameMetaTag('twitter:description', transformedData.metaDescription);
        updateOrCreateNameMetaTag('twitter:site', '@kliv');

        // Add hero image as og:image if available
        if (transformedData.hero.image) {
          updateOrCreateMetaTag('og:image', new URL(transformedData.hero.image, window.location.origin).href);
          updateOrCreateNameMetaTag('twitter:image', new URL(transformedData.hero.image, window.location.origin).href);
        }

        // Add breadcrumb structured data
        const breadcrumbItems = getBreadcrumbItems();
        const breadcrumbStructuredData = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "All Inspiration",
              "item": new URL(`/${lang}/inspiration`, window.location.origin).href
            },
            ...breadcrumbItems.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 2,
              "name": item.label,
              "item": item.href ? new URL(item.href, window.location.origin).href : window.location.href
            }))
          ]
        };

        // Add structured data for SEO
        const structuredData = {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": transformedData.title,
          "description": transformedData.metaDescription,
          "url": window.location.href,
          "breadcrumb": breadcrumbStructuredData,
          "mainEntity": {
            "@type": "SoftwareApplication",
            "name": "Kliv AI Platform",
            "applicationCategory": "DeveloperApplication",
            "description": transformedData.description,
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          }
        };

        // Add FAQ structured data if FAQ section exists
        const faqSection = transformedData.sections.find(section => section.type === 'faq');
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

    // Helper function to convert category display name to slug
    const getCategorySlugFromName = (categoryName: string) => {
      const nameToSlug: Record<string, string> = {
        'AI & Machine Learning': 'ai-and-machine-learning',
        'E-commerce Management': 'e-commerce-management',
        'CRM & Customer Relationship Management': 'crm-customer-relationship-management',
        'Civic & Government Tools': 'civic-and-government-tools',
        'No-Code & Automation Tools': 'no-code-and-automation-tools',
        'Business & Portfolio Websites': 'business-and-portfolio-websites',
        'Health & Wellness': 'health-and-wellness',
        'Financial Services & Banking': 'financial-services-and-banking',
        'Media & Entertainment': 'media-and-entertainment',
        'Educational Tools': 'educational-tools',
        'Productivity Tools': 'productivity-tools',
        'Website Building': 'website-building',
        'Gaming & Entertainment': 'gaming-and-entertainment',
        'Social Media Management': 'social-media-management',
        'Sports & Recreation': 'sports-and-recreation',
        'Travel & Tourism': 'travel-and-tourism',
        'Real Estate Management': 'real-estate-management',
        'Healthcare': 'healthcare',
        'Restaurant & Food Service': 'restaurant-and-food-service',
        'Inventory Management': 'inventory-management',
        'Employee & HR Management': 'employee-and-hr-management',
        'Project Management & Collaboration': 'project-management-and-collaboration',
        'Transportation & Logistics': 'transportation-and-logistics',
        'Security & Surveillance': 'security-and-surveillance',
        'Sustainability & Environment': 'sustainability-and-environment'
      };
      
      return nameToSlug[categoryName] || categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
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
    stopAnimation();
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Focus the textarea after a short delay to allow scroll to complete
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 500);
  };

  const handleExampleClick = (example: { short: string; full: string }) => {
    setMessage(example.full);
    stopAnimation();
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    stopAnimation();
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    if (!message.trim()) {
      startAnimation();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (e.target.value.trim() && isActive) {
      stopAnimation();
    } else if (!e.target.value.trim() && !isInputFocused) {
      startAnimation();
    }
  };

  // Determine what to show as placeholder
  const getPlaceholder = () => {
    if (isInputFocused || message.trim()) {
      return t('hero.placeholder');
    }
    // Only show default placeholder if animation is completely inactive
    // Otherwise show the animated text (even if empty during deletion)
    if (!isActive) {
      return t('hero.placeholder');
    }
    return displayText || '';
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
              <div className="max-w-4xl mx-auto">
                {section.content && (
                  <div className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {section.content.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                )}
                {section.image && (
                  <div className="mt-8">
                    <img
                      src={section.image}
                      alt={section.title || 'Section illustration'}
                      className="w-full max-w-2xl mx-auto h-auto rounded-lg shadow-lg"
                      loading="lazy"
                    />
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Photo by <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Unsplash</a>
                    </p>
                  </div>
                )}
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
              <div className="max-w-4xl mx-auto">
                {section.content && (
                  <div className="prose prose-lg dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground mb-8">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {section.content}
                    </ReactMarkdown>
                  </div>
                )}
                {section.image && (
                  <div className="mt-8">
                    <img
                      src={section.image}
                      alt={section.title || 'Section illustration'}
                      className="w-full max-w-2xl mx-auto h-auto rounded-lg shadow-lg"
                      loading="lazy"
                    />
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Photo by <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Unsplash</a>
                    </p>
                  </div>
                )}
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
                {section.items && (
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
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
                {section.image && (
                  <div className="mt-8">
                    <img
                      src={section.image}
                      alt={section.title || 'Section illustration'}
                      className="w-full max-w-2xl mx-auto h-auto rounded-lg shadow-lg"
                      loading="lazy"
                    />
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Photo by <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Unsplash</a>
                    </p>
                  </div>
                )}
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
                {section.items && (
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
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
                {section.image && (
                  <div className="mt-8">
                    <img
                      src={section.image}
                      alt={section.title || 'Section illustration'}
                      className="w-full max-w-2xl mx-auto h-auto rounded-lg shadow-lg"
                      loading="lazy"
                    />
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Photo by <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Unsplash</a>
                    </p>
                  </div>
                )}
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
      
      {/* Breadcrumb Navigation */}
      <div className="pt-16 bg-muted/20 border-b border-border">
        <Breadcrumb items={getBreadcrumbItems()} lang={lang || 'en'} />
        {isTranslatedFromEnglish && (
          <div className="container mx-auto px-4 py-2">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg px-3 py-2 text-sm">
              <span className="text-yellow-800 dark:text-yellow-200">
                {t('landing.englishFallback', 'This content is currently available in English only. We\'re working on translating it to your language.')}
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Hero Section with optional hero image */}
      <section className="pt-12 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient">
                {content?.hero.title}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              {content?.hero.subtitle}
            </p>

            {/* Hero Image - centered and inline */}
            {content?.hero.image && (
              <div className="mb-12">
                <img
                  src={content.hero.image}
                  alt={content.hero.title}
                  className="w-full max-w-3xl mx-auto h-auto rounded-lg shadow-xl"
                  loading="eager"
                />
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Photo by <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Unsplash</a>
                </p>
              </div>
            )}

            {/* Text Input Box with Typing Animation */}
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-card border-2 border-border hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="space-y-6">
                  {/* Reinforcement text about building apps and websites */}
                  <p className="text-lg text-muted-foreground text-center">
                    {t('landing.buildPrompt', {
                      topic: formatCategoryName(category || '')
                    })}
                  </p>
                  
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
                      placeholder={getPlaceholder()}
                      value={message}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      className="min-h-[140px] text-lg resize-none border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 rounded-lg p-4"
                    />
                    {message.length > 0 && (
                      <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                        {message.length} {t('hero.charactersCount')}
                      </div>
                    )}
                  </div>
                  
                  {/* Shortcut buttons and CTA */}
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    {promptExamples.length > 0 && (
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-sm text-muted-foreground">
                          {t('hero.examples.label')}
                        </span>
                        {promptExamples.slice(0, 3).map((example, index) => (
                          <button
                            key={index}
                            onClick={() => handleExampleClick(example)}
                            className="text-sm text-primary hover:text-primary/80 underline underline-offset-2 transition-colors px-2 py-1 rounded hover:bg-primary/5"
                          >
                            {example.short}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    <Button
                      onClick={handleStartBuilding}
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 min-w-[160px]"
                    >
                      {t('landing.askAiToBuild', 'Ask AI to build')}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Sections */}
      {content?.sections.map((section, index) => renderSection(section, index))}

      <Footer />
    </div>
  );
}