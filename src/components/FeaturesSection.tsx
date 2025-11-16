
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
    { key: 'userAccounts', icon: UserCircle2 },
    { key: 'database', icon: Database },
    { key: 'fileUploads', icon: Upload },
    { key: 'email', icon: Mail },
    { key: 'hosting', icon: Zap },
    { key: 'domain', icon: Globe },
    { key: 'mobile', icon: Smartphone },
    { key: 'team', icon: Users },
    { key: 'ai', icon: Sparkles }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-blue-500/10 border border-blue-500/20 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-400">{t('features.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-[1.1]">
            <span className="text-gradient">
              {t('features.title')}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Top highlights - bullet style */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Left column - first 3 features as bullets */}
            <div className="space-y-4">
              {featureKeys.slice(0, 3).map((feature, index) => {
                const colors = [
                  { bg: 'bg-cyan-500/20 dark:bg-cyan-500/30', dot: 'bg-cyan-600 dark:bg-cyan-400' },
                  { bg: 'bg-emerald-500/20 dark:bg-emerald-500/30', dot: 'bg-emerald-600 dark:bg-emerald-400' },
                  { bg: 'bg-blue-500/20 dark:bg-blue-500/30', dot: 'bg-blue-600 dark:bg-blue-400' }
                ];
                return (
                  <div key={feature.key} className="flex items-start space-x-3 group">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full ${colors[index].bg} flex items-center justify-center mt-0.5`}>
                      <div className={`w-2 h-2 rounded-full ${colors[index].dot}`}></div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                        {t(`features.${feature.key}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t(`features.${feature.key}.description`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right column - next 3 features as bullets */}
            <div className="space-y-4">
              {featureKeys.slice(3, 6).map((feature, index) => {
                const colors = [
                  { bg: 'bg-amber-500/20 dark:bg-amber-500/30', dot: 'bg-amber-600 dark:bg-amber-400' },
                  { bg: 'bg-purple-500/20 dark:bg-purple-500/30', dot: 'bg-purple-600 dark:bg-purple-400' },
                  { bg: 'bg-pink-500/20 dark:bg-pink-500/30', dot: 'bg-pink-600 dark:bg-pink-400' }
                ];
                return (
                  <div key={feature.key} className="flex items-start space-x-3 group">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full ${colors[index].bg} flex items-center justify-center mt-0.5`}>
                      <div className={`w-2 h-2 rounded-full ${colors[index].dot}`}></div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                        {t(`features.${feature.key}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t(`features.${feature.key}.description`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom features - card style for emphasis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featureKeys.slice(6).map((feature) => (
              <Card 
                key={feature.key} 
                className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300 mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors">
                    {t(`features.${feature.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {t(`features.${feature.key}.description`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
