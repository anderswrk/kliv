import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Cloud,
  Database, 
  Shield, 
  Server, 
  FileText, 
  Mail, 
  Layout,
  Cpu,
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
  Component
} from 'lucide-react';

export function Features() {
  const { t } = useTranslation();

  const klivCloudFeatures = [
    {
      icon: Database,
      title: t('features.page.klivCloud.database.title'),
      description: t('features.page.klivCloud.database.description'),
      gradient: 'from-cyan-500 to-cyan-600',
    },
    {
      icon: Layout,
      title: t('features.page.klivCloud.content.title'),
      description: t('features.page.klivCloud.content.description'),
      gradient: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: Shield,
      title: t('features.page.klivCloud.secrets.title'),
      description: t('features.page.klivCloud.secrets.description'),
      gradient: 'from-amber-500 to-amber-600',
    },
    {
      icon: Server,
      title: t('features.page.klivCloud.functions.title'),
      description: t('features.page.klivCloud.functions.description'),
      gradient: 'from-violet-500 to-violet-600',
    },
    {
      icon: Cpu,
      title: t('features.page.klivCloud.admin.title'),
      description: t('features.page.klivCloud.admin.description'),
      gradient: 'from-rose-500 to-rose-600',
    },
    {
      icon: Mail,
      title: t('features.page.klivCloud.email.title'),
      description: t('features.page.klivCloud.email.description'),
      gradient: 'from-blue-500 to-blue-600',
    },
  ];

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
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Header */}
        <div className="border-b border-border/50 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-6 backdrop-blur-sm">
                <Code className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm font-semibold text-primary">{t('features.page.badge')}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1]">
                <span className="text-gradient">
                  {t('features.page.title')}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                {t('features.page.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Kliv Cloud Backend */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Kliv Cloud Introduction */}
            <div className="text-center mb-14">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 mb-6 backdrop-blur-sm">
                <Cloud className="w-4 h-4 mr-2 text-cyan-600 dark:text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-400">Kliv Cloud</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-[1.1]">
                <span className="text-gradient">
                  {t('features.page.klivCloud.title')}
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                {t('features.page.klivCloud.subtitle')}
              </p>
              <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 dark:from-cyan-950/20 dark:to-emerald-950/20 rounded-2xl p-8 max-w-4xl mx-auto border border-cyan-200/50 dark:border-cyan-800/50 backdrop-blur-sm">
                <p className="text-muted-foreground leading-relaxed mb-4 text-base">
                  {t('features.page.klivCloud.intro')}
                </p>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {t('features.page.klivCloud.enterprise')}
                </p>
              </div>
            </div>

            {/* Kliv Cloud Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {klivCloudFeatures.map((feature, index) => (
                <Card key={index} className="group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl hover:scale-[1.02] hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Core Development Features */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 leading-[1.1]">
                <span className="text-gradient">
                  {t('features.page.core.title')}
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {coreFeatures.map((feature, index) => (
                <Card key={index} className="group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl hover:scale-[1.02] hover:-translate-y-1">
                  <CardContent className="p-5 text-center">
                    <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors">
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
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-3 leading-[1.1]">
                  <span className="text-gradient">
                    {t('features.page.development.title')}
                  </span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {developmentFeatures.map((feature, index) => (
                  <Card key={index} className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 group">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="inline-flex p-3 rounded-2xl bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300">
                            <feature.icon className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed text-sm">
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
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-3 leading-[1.1]">
                  <span className="text-gradient">
                    {t('features.page.deployment.title')}
                  </span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {deploymentFeatures.map((feature, index) => (
                  <Card key={index} className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1 group">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 group-hover:bg-emerald-500/20 dark:group-hover:bg-emerald-500/30 transition-colors duration-300">
                            <feature.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed text-sm">
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
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-3 leading-[1.1]">
                  <span className="text-gradient">
                    {t('features.page.technology.title')}
                  </span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {technologyFeatures.map((feature, index) => (
                  <Card key={index} className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 group">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 group-hover:bg-indigo-500/20 dark:group-hover:bg-indigo-500/30 transition-colors duration-300">
                            <feature.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed text-sm">
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