import { useTranslation } from 'react-i18next';
import { GetStartedCTA } from './GetStartedCTA';

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
          <GetStartedCTA />
        </div>
      </div>
    </section>
  );
}
