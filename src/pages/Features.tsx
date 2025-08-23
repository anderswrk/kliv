import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MessageSquare, 
  Eye, 
  Code, 
  Smartphone, 
  FileCode, 
  Bug, 
  RotateCcw, 
  History, 
  Rocket, 
  Globe, 
  Github, 
  Copy,
  Layers,
  Palette,
  Component,
  Database
} from 'lucide-react';

export function Features() {
  const { t } = useTranslation();

  const coreFeatures = [
    {
      icon: MessageSquare,
      title: t('features.page.core.aiChat.title'),
      description: t('features.page.core.aiChat.description'),
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Eye,
      title: t('features.page.core.livePreview.title'),
      description: t('features.page.core.livePreview.description'),
      gradient: 'from-green-500 to-green-600',
    },
    {
      icon: Code,
      title: t('features.page.core.codeGeneration.title'),
      description: t('features.page.core.codeGeneration.description'),
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      icon: Smartphone,
      title: t('features.page.core.responsive.title'),
      description: t('features.page.core.responsive.description'),
      gradient: 'from-indigo-500 to-indigo-600',
    },
  ];

  const developmentFeatures = [
    {
      icon: FileCode,
      title: t('features.page.development.sourceCode.title'),
      description: t('features.page.development.sourceCode.description'),
    },
    {
      icon: Bug,
      title: t('features.page.development.debugging.title'),
      description: t('features.page.development.debugging.description'),
    },
    {
      icon: RotateCcw,
      title: t('features.page.development.iterative.title'),
      description: t('features.page.development.iterative.description'),
    },
    {
      icon: History,
      title: t('features.page.development.versionControl.title'),
      description: t('features.page.development.versionControl.description'),
    },
  ];

  const deploymentFeatures = [
    {
      icon: Rocket,
      title: t('features.page.deployment.oneClick.title'),
      description: t('features.page.deployment.oneClick.description'),
    },
    {
      icon: Globe,
      title: t('features.page.deployment.customDomain.title'),
      description: t('features.page.deployment.customDomain.description'),
    },
    {
      icon: Github,
      title: t('features.page.deployment.github.title'),
      description: t('features.page.deployment.github.description'),
    },
    {
      icon: Copy,
      title: t('features.page.deployment.remix.title'),
      description: t('features.page.deployment.remix.description'),
    },
  ];

  const technologyFeatures = [
    {
      icon: Layers,
      title: t('features.page.technology.react.title'),
      description: t('features.page.technology.react.description'),
    },
    {
      icon: Palette,
      title: t('features.page.technology.tailwind.title'),
      description: t('features.page.technology.tailwind.description'),
    },
    {
      icon: Component,
      title: t('features.page.technology.shadcn.title'),
      description: t('features.page.technology.shadcn.description'),
    },
    {
      icon: Database,
      title: t('features.page.technology.supabase.title'),
      description: t('features.page.technology.supabase.description'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Header */}
        <div className="border-b border-border bg-muted/30 pt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Code className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-primary">{t('features.page.badge')}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                {t('features.page.title')}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t('features.page.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Core Features */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('features.page.core.title')}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {coreFeatures.map((feature, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Development Tools */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{t('features.page.development.title')}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {developmentFeatures.map((feature, index) => (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="inline-flex p-3 rounded-xl bg-primary/10">
                            <feature.icon className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-3">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Deployment & Sharing */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{t('features.page.deployment.title')}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {deploymentFeatures.map((feature, index) => (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="inline-flex p-3 rounded-xl bg-green-500/10">
                            <feature.icon className="h-6 w-6 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-3">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Technology Stack */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{t('features.page.technology.title')}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {technologyFeatures.map((feature, index) => (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="inline-flex p-3 rounded-xl bg-purple-500/10">
                            <feature.icon className="h-6 w-6 text-purple-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-3">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}