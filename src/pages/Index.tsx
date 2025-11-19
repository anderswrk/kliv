import React from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { GetStartedCTA } from '@/components/GetStartedCTA';
import CommunityShowcase from '@/components/CommunityShowcase';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { useUserSession } from '../hooks/useUserSession';

export const Index = () => {
  const { refreshSession } = useUserSession();

  // Refresh session when the home page loads to ensure header state is current
  React.useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-4">
        <HeroSection />
        <CommunityShowcase />
        <GetStartedCTA variant="compact" className="bg-muted/30 py-12" />
        <HowItWorksSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};