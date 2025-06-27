
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Shield } from 'lucide-react';
import { useMarkdownContent } from '@/hooks/useMarkdownContent';

export function Security() {
  const { t } = useTranslation();
  const { content, loading, error } = useMarkdownContent('security');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Header */}
        <div className="border-b border-border bg-muted/30 pt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Shield className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-primary">{t('security.badge')}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                {t('security.title')}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t('security.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                {loading && (
                  <div className="space-y-6">
                    <Skeleton className="h-8 w-3/4" />
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                    <Skeleton className="h-6 w-1/2" />
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                )}
                
                {error && (
                  <div className="text-center py-8">
                    <p className="text-destructive mb-4">Error loading security information</p>
                    <p className="text-muted-foreground text-sm">{error}</p>
                  </div>
                )}
                
                {content && !loading && !error && (
                  <div className="prose prose-lg max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {content}
                    </ReactMarkdown>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
