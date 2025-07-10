import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ExternalLink, Lightbulb } from 'lucide-react';
import { LocalizedLink } from '@/components/LocalizedLink';
import { Breadcrumb } from '@/components/Breadcrumb';

interface InspirationPage {
  title: string;
  description: string;
  slug: string;
  subcategory: string | null;
  url: string;
  features: string[];
  tags: string[];
}

interface CategoryData {
  slug: string;
  pages: InspirationPage[];
}

interface InspirationData {
  [categoryName: string]: CategoryData;
}

export const CategoryPage = () => {
  const { lang, categorySlug } = useParams<{ lang: string; categorySlug: string }>();
  const { t } = useTranslation();
  const [inspirationData, setInspirationData] = useState<InspirationData>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [categoryDisplayName, setCategoryDisplayName] = useState('');

  useEffect(() => {
    const loadInspirationData = async () => {
      try {
        const response = await fetch(`/content/inspiration/${lang || 'en'}.json`);
        if (response.ok) {
          const data = await response.json();
          setInspirationData(data);

          // Find the display name for the current category slug
          const foundCategory = Object.values(data).find(
            (cat: CategoryData) => cat.slug === categorySlug
          );
          if (foundCategory) {
            setCategoryDisplayName(
              Object.keys(data).find(key => data[key].slug === categorySlug) || categorySlug
            );
          }
        }
      } catch (error) {
        console.error('Error loading inspiration data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInspirationData();
  }, [lang, categorySlug]);

  // Function to get translated category name
  const getTranslatedCategoryName = (categoryName: string) => {
    const categoryKey = categoryName.replace(/\s+/g, ' ').replace(/&/g, 'And');
    return t(`inspiration.categories.${categoryKey}`, { defaultValue: categoryName });
  };

  // Filter pages based on search term and categorySlug
  const filteredData = React.useMemo(() => {
    const filtered: InspirationData = {};
    
    Object.entries(inspirationData).forEach(([categoryName, categoryData]) => {
      if (categoryData.slug === categorySlug) {
        const filteredPages = categoryData.pages.filter(page =>
          page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          page.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          page.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        
        if (filteredPages.length > 0) {
          filtered[categoryName] = {
            ...categoryData,
            pages: filteredPages
          };
        }
      }
    });
    
    return filtered;
  }, [inspirationData, searchTerm, categorySlug]);

  const breadcrumbItems = [
    { label: getTranslatedCategoryName(categoryDisplayName), href: `/${lang}/inspiration/${categorySlug}` }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">{t('inspiration.loadingInspiration')}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb Navigation */}
      <div className="pt-16 bg-muted/20 border-b border-border">
        <Breadcrumb items={breadcrumbItems} lang={lang || 'en'} />
      </div>

      <main className="pt-8">
        {/* Header */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Lightbulb className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm font-medium text-primary">{t('inspiration.badge')}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {getTranslatedCategoryName(categoryDisplayName)}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t('inspiration.categorySubtitle', { category: getTranslatedCategoryName(categoryDisplayName) })}
            </p>
          </div>
        </div>

        {/* Search Section */}
        <section className="py-8 bg-background border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder={t('inspiration.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {Object.keys(filteredData).length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">{t('inspiration.noAppsFound')}</p>
              </div>
            ) : (
              Object.entries(filteredData).map(([categoryName, categoryData]) => (
                <div key={categoryName} className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-foreground">
                    {getTranslatedCategoryName(categoryName)}
                    <span className="text-lg font-normal text-muted-foreground ml-2">
                      ({categoryData.pages.length} ideas)
                    </span>
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryData.pages.map((page) => (
                      <Card key={page.slug} className="hover:shadow-lg transition-shadow duration-200 border-border">
                        <CardHeader>
                          <CardTitle className="flex items-start justify-between">
                            <span className="text-lg">{page.title}</span>
                            <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {page.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {page.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {page.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {page.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{page.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}
                          
                          <LocalizedLink to={page.url}>
                            <Button className="w-full" variant="outline">
                              {t('inspiration.viewDetails')}
                            </Button>
                          </LocalizedLink>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};