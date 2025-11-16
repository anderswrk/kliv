
import { useTranslation } from 'react-i18next';
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
    { 
      key: 'userAccounts', 
      icon: UserCircle2, 
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop&q=80'
    },
    { 
      key: 'database', 
      icon: Database, 
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&h=400&fit=crop&q=80'
    },
    { 
      key: 'fileUploads', 
      icon: Upload, 
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&q=80'
    },
    { 
      key: 'email', 
      icon: Mail, 
      image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=600&h=400&fit=crop&q=80'
    },
    { 
      key: 'hosting', 
      icon: Zap, 
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&q=80'
    },
    { 
      key: 'domain', 
      icon: Globe, 
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop&q=80'
    },
    { 
      key: 'mobile', 
      icon: Smartphone, 
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&q=80'
    },
    { 
      key: 'team', 
      icon: Users, 
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&q=80'
    },
    { 
      key: 'ai', 
      icon: Sparkles, 
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&q=80'
    }
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
            <span className="text-blue-700 dark:text-blue-400">Complete Backend Included</span>
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

        <div className="space-y-16 max-w-6xl mx-auto">
          {featureKeys.map((feature, index) => {
            return (
              <div 
                key={feature.key} 
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
              >
                {/* Image Side */}
                <div className="flex-shrink-0 w-full lg:w-2/5">
                  <div className="relative group">
                    {/* Subtle glow effect */}
                    <div className="absolute -inset-3 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Main image container */}
                    <div className="relative overflow-hidden rounded-xl border border-border/50 bg-muted/30">
                      <img 
                        src={feature.image} 
                        alt={t(`features.${feature.key}.title`)}
                        className="w-full h-auto aspect-[3/2] object-cover"
                        loading="lazy"
                      />
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
                    </div>
                    
                    {/* Decorative corner accent */}
                    <div className={`absolute ${index % 2 === 0 ? '-bottom-2 -right-2' : '-bottom-2 -left-2'} w-12 h-12 bg-primary/20 dark:bg-primary/30 rounded-full blur-lg`}></div>
                  </div>
                </div>
                
                {/* Content Side */}
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl lg:text-2xl font-bold">
                    {t(`features.${feature.key}.title`)}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {t(`features.${feature.key}.description`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
