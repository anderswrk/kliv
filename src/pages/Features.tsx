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
    },
    {
      icon: Layout,
      title: t('features.page.klivCloud.content.title'),
      description: t('features.page.klivCloud.content.description'),
    },
    {
      icon: Shield,
      title: t('features.page.klivCloud.secrets.title'),
      description: t('features.page.klivCloud.secrets.description'),
    },
    {
      icon: Server,
      title: t('features.page.klivCloud.functions.title'),
      description: t('features.page.klivCloud.functions.description'),
    },
    {
      icon: Cpu,
      title: t('features.page.klivCloud.admin.title'),
      description: t('features.page.klivCloud.admin.description'),
    },
    {
      icon: Mail,
      title: t('features.page.klivCloud.email.title'),
      description: t('features.page.klivCloud.email.description'),
    },
  ];

  const coreFeatures = [
    {
      icon: MessageSquare,
      title: t('features.page.core.aiChat.title'),
      description: t('features.page.core.aiChat.description'),
    },
    {
      icon: Eye,
      title: t('features.page.core.livePreview.title'),
      description: t('features.page.core.livePreview.description'),
    },
    {
      icon: Code,
      title: t('features.page.core.codeGeneration.title'),
      description: t('features.page.core.codeGeneration.description'),
    },
    {
      icon: Smartphone,
      title: t('features.page.core.responsive.title'),
      description: t('features.page.core.responsive.description'),
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-6xl mx-auto">
            {/* Kliv Cloud Introduction - Two Column Layout */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 mb-6 backdrop-blur-sm">
                  <Cloud className="w-4 h-4 mr-2 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-400">Kliv Cloud</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-[1.1]">
                  <span className="text-gradient">
                    {t('features.page.klivCloud.title')}
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                {/* Left: Description */}
                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t('features.page.klivCloud.intro')}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t('features.page.klivCloud.enterprise')}
                  </p>
                </div>

                {/* Right: Key Highlights */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 dark:bg-cyan-500/30 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Automatic Setup</h3>
                      <p className="text-sm text-muted-foreground">AI creates your database, functions, and access control</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 dark:bg-emerald-500/30 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Enterprise Security</h3>
                      <p className="text-sm text-muted-foreground">Row-level security, encryption, and audit trails</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 dark:bg-blue-500/30 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Visual Admin</h3>
                      <p className="text-sm text-muted-foreground">Manage data, monitor functions, no code required</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 dark:bg-amber-500/30 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-amber-600 dark:bg-amber-400"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Global Replication</h3>
                      <p className="text-sm text-muted-foreground">Fast, reliable database with automatic backups</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kliv Cloud Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {klivCloudFeatures.map((feature, index) => (
                  <Card key={index} className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 group">
                    <CardContent className="p-6">
                      <div className="inline-flex p-3 rounded-2xl bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300 mb-4">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Core Development Features */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-3 leading-[1.1]">
                  <span className="text-gradient">
                    {t('features.page.core.title')}
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t('features.page.subtitle')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {coreFeatures.map((feature, index) => (
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

            {/* Combined: Development & Deployment */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              {/* Development Tools */}
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 leading-[1.1]">
                    <span className="text-gradient">
                      {t('features.page.development.title')}
                    </span>
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {developmentFeatures.map((feature, index) => (
                    <Card key={index} className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 group">
                      <CardContent className="p-5">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="inline-flex p-2.5 rounded-xl bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300">
                              <feature.icon className="h-5 w-5 text-primary" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
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
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 leading-[1.1]">
                    <span className="text-gradient">
                      {t('features.page.deployment.title')}
                    </span>
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {deploymentFeatures.map((feature, index) => (
                    <Card key={index} className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1 group">
                      <CardContent className="p-5">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="inline-flex p-2.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 group-hover:bg-emerald-500/20 dark:group-hover:bg-emerald-500/30 transition-colors duration-300">
                              <feature.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
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

            {/* Technology Stack */}
            <div className="text-center">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 leading-[1.1]">
                  <span className="text-gradient">
                    {t('features.page.technology.title')}
                  </span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {technologyFeatures.map((feature, index) => (
                  <Card key={index} className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 group">
                    <CardContent className="p-6">
                      <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 group-hover:bg-indigo-500/20 dark:group-hover:bg-indigo-500/30 transition-colors duration-300 mb-4">
                        <feature.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="font-bold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {feature.description}
                      </p>
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