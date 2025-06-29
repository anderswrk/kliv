import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { CommunityShowcase } from '@/components/CommunityShowcase';
import { Footer } from '@/components/Footer';

export const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <CommunityShowcase />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};