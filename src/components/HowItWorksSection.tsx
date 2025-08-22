import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Code, Rocket, Sparkles } from 'lucide-react';

const HowItWorksSection = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: MessageSquare,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
    },
    {
      icon: Sparkles,
      title: t('howItWorks.step2.title'), 
      description: t('howItWorks.step2.description'),
    },
    {
      icon: Code,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
    },
    {
      icon: Rocket,
      title: t('howItWorks.step4.title'),
      description: t('howItWorks.step4.description'),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative bg-card border border-border hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <div className="mt-4 mb-4">
                  <step.icon className="w-12 h-12 mx-auto text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;