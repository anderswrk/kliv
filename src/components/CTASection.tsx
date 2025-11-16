import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { LocalizedLink } from './LocalizedLink';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent/20 via-primary/10 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t('cta.title')}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg hover:shadow-xl hover:shadow-accent/20 transition-all text-base sm:text-lg h-12 sm:h-14 px-8"
              asChild
            >
              <LocalizedLink to="/signup">
                {t('cta.getStarted')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </LocalizedLink>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-base sm:text-lg h-12 sm:h-14 px-8 border-2"
              asChild
            >
              <LocalizedLink to="/features">
                {t('cta.learnMore')}
              </LocalizedLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
