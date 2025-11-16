
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { 
  UserCircle2, 
  Database, 
  Upload, 
  Mail, 
  Zap, 
  Globe, 
  Smartphone, 
  Users, 
  Sparkles 
} from 'lucide-react';

export function FeaturesSection() {
  const { t } = useTranslation();

  const featureKeys = [
    { key: 'userAccounts', icon: UserCircle2, gradient: 'from-blue-500 to-cyan-500' },
    { key: 'database', icon: Database, gradient: 'from-emerald-500 to-teal-500' },
    { key: 'fileUploads', icon: Upload, gradient: 'from-violet-500 to-indigo-500' },
    { key: 'email', icon: Mail, gradient: 'from-rose-500 to-pink-500' },
    { key: 'hosting', icon: Zap, gradient: 'from-primary to-accent' },
    { key: 'domain', icon: Globe, gradient: 'from-orange-500 to-amber-500' },
    { key: 'mobile', icon: Smartphone, gradient: 'from-cyan-500 to-blue-500' },
    { key: 'team', icon: Users, gradient: 'from-fuchsia-500 to-purple-500' },
    { key: 'ai', icon: Sparkles, gradient: 'from-accent to-orange-500' }
  ];

  return (
    <section id="features" className="py-32 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-blue-500/10 border border-blue-500/20 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm">
            <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-400">Complete Backend Included</span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1]">
            <span className="text-gradient">
              {t('features.title')}
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {featureKeys.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.key} 
                className="group relative overflow-hidden border border-border/50 bg-gradient-to-b from-card/90 to-card/70 dark:from-card/70 dark:to-card/50 backdrop-blur-xl hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
              >
                <CardContent className="p-8">
                  {/* Animated gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}></div>
                  
                  {/* Icon with gradient background */}
                  <div className="relative mb-6">
                    <div className={`inline-flex p-5 rounded-3xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}>
                      <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                      {t(`features.${feature.key}.title`)}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-[15px]">
                      {t(`features.${feature.key}.description`)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
