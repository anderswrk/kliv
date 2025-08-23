
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';

export function FeaturesSection() {
  const { t } = useTranslation();

  const featureKeys = [
    { key: 'hosting', delay: '0ms' },
    { key: 'domain', delay: '100ms' },
    { key: 'github', delay: '200ms' },
    { key: 'ai', delay: '300ms' },
    { key: 'editing', delay: '400ms' },
    { key: 'snapshots', delay: '500ms' },
    { key: 'mobile', delay: '600ms' }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-br from-gray-50 via-slate-100 to-gray-200 dark:from-gray-900 dark:via-slate-800 dark:to-gray-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-r from-gray-300/20 via-slate-400/30 to-gray-300/20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-6">
            ✨ Everything You Need
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 dark:from-white dark:via-gray-200 dark:to-gray-300 bg-clip-text text-transparent leading-tight">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featureKeys.map((feature, index) => (
            <Card 
              key={feature.key} 
              className="group hover:shadow-2xl hover:shadow-gray-500/10 transition-all duration-500 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl hover:scale-[1.02] hover:-translate-y-2"
              style={{ animationDelay: feature.delay }}
            >
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                  {t(`features.${feature.key}.title`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t(`features.${feature.key}.description`)}
                </p>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-600/0 via-gray-600/5 to-gray-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </CardContent>
            </Card>
          ))}
        </div>


      </div>
    </section>
  );
}
