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
    <section id="how-it-works" className="py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,107,107,0.05),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center px-5 py-2.5 bg-accent/10 dark:bg-accent/20 border border-accent/20 dark:border-accent/30 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2 text-accent" />
            <span className="text-accent">Simple Process</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold mb-8 leading-[1.1]">
            <span className="text-gradient">
              {t('howItWorks.title')}
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="relative bg-card/80 dark:bg-card/60 backdrop-blur-xl border border-border/50 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent text-white rounded-full flex items-center justify-center font-bold text-base shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <div className="mt-6 mb-6">
                  <div className="inline-flex p-4 rounded-2xl bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
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