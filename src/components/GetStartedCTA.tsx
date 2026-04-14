import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useUserSession } from '../hooks/useUserSession';

interface GetStartedCTAProps {
  variant?: 'large' | 'compact';
  className?: string;
  includeLearnMore?: boolean;
}

export function GetStartedCTA({ 
  variant = 'large', 
  className = '',
  includeLearnMore = true 
}: GetStartedCTAProps) {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const { isLoggedIn, goToPortal } = useUserSession();

  const handleGetStarted = () => {
    if (isLoggedIn) {
      // User is logged in, go to portal
      goToPortal();
    } else {
      // User is not logged in, navigate to localized signup
      const currentLang = lang || 'en';
      window.location.href = `/${currentLang}/signup`;
    }
  };

  const handleLearnMore = () => {
    const currentLang = lang || 'en';
    window.location.href = `/${currentLang}/features`;
  };

  if (variant === 'compact') {
    return (
      <div className={`flex justify-center py-8 ${className}`}>
        <Button 
          size="lg" 
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium shadow-lg hover:shadow-xl hover:shadow-accent/20 transition-all text-base px-6 py-2"
          onClick={handleGetStarted}
        >
          {isLoggedIn ? t('cta.goToPortal') : t('cta.getStarted')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${className}`}>
      <Button 
        size="lg" 
        className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg hover:shadow-xl hover:shadow-accent/20 transition-all text-base sm:text-lg h-12 sm:h-14 px-8"
        onClick={handleGetStarted}
      >
        {isLoggedIn ? t('cta.goToPortal') : t('cta.getStarted')}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      {includeLearnMore && (
        <Button 
          size="lg" 
          variant="outline"
          className="text-base sm:text-lg h-12 sm:h-14 px-8 border-2"
          onClick={handleLearnMore}
        >
          {t('cta.learnMore')}
        </Button>
      )}
    </div>
  );
}