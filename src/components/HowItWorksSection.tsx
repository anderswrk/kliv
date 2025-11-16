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
    <section id="how-it-works" className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,107,107,0.05),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-5 py-2.5 bg-accent/10 dark:bg-accent/20 border border-accent/20 dark:border-accent/30 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2 text-accent" />
            <span className="text-accent">Simple Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-[1.1]">
            <span className="text-gradient">
              {t('howItWorks.title')}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-accent/40 to-primary/20"></div>
          
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            const colors = [
              { gradient: 'from-cyan-500 to-blue-500', glow: 'shadow-cyan-500/50', bg: 'bg-cyan-500/10 dark:bg-cyan-500/20' },
              { gradient: 'from-emerald-500 to-green-500', glow: 'shadow-emerald-500/50', bg: 'bg-emerald-500/10 dark:bg-emerald-500/20' },
              { gradient: 'from-amber-500 to-orange-500', glow: 'shadow-amber-500/50', bg: 'bg-amber-500/10 dark:bg-amber-500/20' },
              { gradient: 'from-purple-500 to-pink-500', glow: 'shadow-purple-500/50', bg: 'bg-purple-500/10 dark:bg-purple-500/20' }
            ];
            
            return (
              <div key={index} className="relative mb-16 last:mb-0">
                {/* Mobile layout */}
                <div className="md:hidden flex items-start space-x-4">
                  {/* Number badge */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${colors[index].gradient} shadow-lg ${colors[index].glow} flex items-center justify-center text-white font-bold text-lg`}>
                    {index + 1}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className={`inline-flex p-3 rounded-xl ${colors[index].bg} mb-3`}>
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Desktop timeline layout */}
                <div className="hidden md:flex items-center">
                  {isEven ? (
                    <>
                      {/* Left content */}
                      <div className="w-1/2 pr-12 text-right">
                        <Card className="inline-block text-left bg-card/80 dark:bg-card/60 backdrop-blur-xl border border-border/50 hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-6">
                            <div className={`inline-flex p-3 rounded-xl ${colors[index].bg} mb-3`}>
                              <step.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">
                              {step.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {step.description}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      {/* Center badge */}
                      <div className={`relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br ${colors[index].gradient} shadow-xl ${colors[index].glow} flex items-center justify-center text-white font-bold text-xl`}>
                        {index + 1}
                        {/* Decorative pulse */}
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${colors[index].gradient} opacity-75 animate-ping`}></div>
                      </div>
                      
                      {/* Right spacer */}
                      <div className="w-1/2 pl-12"></div>
                    </>
                  ) : (
                    <>
                      {/* Left spacer */}
                      <div className="w-1/2 pr-12"></div>
                      
                      {/* Center badge */}
                      <div className={`relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br ${colors[index].gradient} shadow-xl ${colors[index].glow} flex items-center justify-center text-white font-bold text-xl`}>
                        {index + 1}
                        {/* Decorative pulse */}
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${colors[index].gradient} opacity-75 animate-ping`}></div>
                      </div>
                      
                      {/* Right content */}
                      <div className="w-1/2 pl-12">
                        <Card className="bg-card/80 dark:bg-card/60 backdrop-blur-xl border border-border/50 hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-6">
                            <div className={`inline-flex p-3 rounded-xl ${colors[index].bg} mb-3`}>
                              <step.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">
                              {step.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {step.description}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;