
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Zap, 
  Globe, 
  Github, 
  Sparkles, 
  Paintbrush, 
  Camera, 
  Smartphone, 
  Users, 
  Shield 
} from 'lucide-react';

export function FeaturesSection() {
  const { t } = useTranslation();

  const featureKeys = [
    { key: 'hosting', icon: Zap, gradient: 'from-primary to-accent' },
    { key: 'domain', icon: Globe, gradient: 'from-emerald-500 to-teal-500' },
    { key: 'github', icon: Github, gradient: 'from-slate-600 to-slate-800' },
    { key: 'ai', icon: Sparkles, gradient: 'from-accent to-orange-500' },
    { key: 'editing', icon: Paintbrush, gradient: 'from-pink-500 to-rose-500' },
    { key: 'snapshots', icon: Camera, gradient: 'from-cyan-500 to-blue-500' },
    { key: 'mobile', icon: Smartphone, gradient: 'from-indigo-500 to-primary' },
    { key: 'teamInvite', icon: Users, gradient: 'from-violet-500 to-fuchsia-500' },
    { key: 'roleAccess', icon: Shield, gradient: 'from-green-500 to-emerald-600' }
  ];

  return (
    <section id="features" className="py-32 bg-gradient-to-b from-muted/30 via-background to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,119,255,0.05),transparent_70%)]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-24">
          <div className="inline-flex items-center px-5 py-2.5 bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span className="text-primary">Everything You Need</span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1]">
            <span className="text-gradient">
              {t('features.title')}
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featureKeys.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.key} 
                className="group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl hover:scale-[1.03] hover:-translate-y-1 overflow-hidden"
              >
                <CardContent className="p-8 relative">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                    {t(`features.${feature.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`features.${feature.key}.description`)}
                  </p>
                  
                  {/* Subtle glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
