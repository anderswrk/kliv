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
      icon: Component,
      title: t('features.page.technology.shadcn.title'),
      description: t('features.page.technology.shadcn.description'),
    },
    {
      icon: Palette,
      title: t('features.page.technology.tailwind.title'),
      description: t('features.page.technology.tailwind.description'),
    },
    {
      icon: Layers,
      title: t('features.page.technology.react.title'),
      description: t('features.page.technology.react.description'),
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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-[1.1]">
                <span className="text-gradient">
                  {t('features.page.title')}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
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
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-[1.1]">
                  <span className="text-gradient">
                    {t('features.page.klivCloud.title')}
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                {/* Left: Description */}
                <div className="space-y-6">
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {t('features.page.klivCloud.intro')}
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
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
                  <Card key={index} className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                    <CardContent className="p-6">
                      <div className="inline-flex p-3 rounded-2xl bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300 mb-4">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors">
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

            {/* Core Development Features - Alternating Layout */}
            <div className="mb-24">
              <div className="text-center mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 leading-[1.1]">
                  <span className="text-gradient">
                    {t('features.page.core.title')}
                  </span>
                </h2>
                <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                  {t('features.page.subtitle')}
                </p>
              </div>
              
              <div className="space-y-16">
                {coreFeatures.map((feature, index) => (
                  <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>
                    {/* Icon Side */}
                    <div className="flex-shrink-0 w-full lg:w-2/5">
                      <div className="relative group">
                        {/* Subtle glow effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Main icon container */}
                        <div className="relative bg-gradient-to-br from-muted/50 to-muted/30 dark:from-muted/30 dark:to-muted/10 backdrop-blur-sm rounded-2xl p-12 lg:p-16 border border-border/50 flex items-center justify-center">
                          <feature.icon className="h-20 w-20 lg:h-24 lg:w-24 text-primary" strokeWidth={1.5} />
                        </div>
                        
                        {/* Decorative corner accent */}
                        <div className={`absolute ${index % 2 === 0 ? '-bottom-3 -right-3' : '-bottom-3 -left-3'} w-16 h-16 bg-primary/20 dark:bg-primary/30 rounded-full blur-xl`}></div>
                      </div>
                    </div>
                    
                    {/* Content Side */}
                    <div className="flex-1 space-y-4">
                      <h3 className="text-xl lg:text-2xl font-bold">
                        {feature.title}
                      </h3>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Development Workflow - Process Flow */}
            <div className="mb-24 bg-gradient-to-br from-muted/30 to-background rounded-3xl p-8 lg:p-12 border border-border/50">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 leading-[1.1]">
                  <span className="text-gradient">
                    {t('features.page.development.title')}
                  </span>
                </h2>
              </div>
              
              <div className="max-w-3xl mx-auto space-y-6">
                {developmentFeatures.map((feature, index) => (
                  <div key={index} className="relative">
                    {/* Connector Line */}
                    {index < developmentFeatures.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-12 bg-gradient-to-b from-primary/50 to-primary/20"></div>
                    )}
                    
                    <div className="flex items-start gap-6 group">
                      {/* Number Badge */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/20">
                        {index + 1}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 pb-6">
                        <div className="flex items-center gap-3 mb-2">
                          <feature.icon className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                            {feature.title}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deployment Options - Grid with Large Icons */}
            <div className="mb-24">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 leading-[1.1]">
                  <span className="text-gradient">
                    {t('features.page.deployment.title')}
                  </span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {deploymentFeatures.map((feature, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/90 to-card/70 dark:from-card/80 dark:to-card/60 backdrop-blur-xl p-8 hover:shadow-xl transition-shadow duration-300">
                    {/* Decorative gradient */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full"></div>
                    
                    <div className="relative">
                      <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 mb-4">
                        <feature.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h3 className="text-lg font-bold mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Stack - Simple Banner Style */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border border-indigo-200/50 dark:border-indigo-800/50 p-12">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
              
              <div className="relative text-center">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 leading-[1.1]">
                  <span className="text-gradient">
                    {t('features.page.technology.title')}
                  </span>
                </h2>
                <p className="text-sm text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Built on industry-leading technologies that ensure quality, performance, and maintainability
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  {technologyFeatures.map((feature, index) => (
                    <div key={index} className="group inline-flex items-center gap-3 px-6 py-4 bg-white/80 dark:bg-black/20 backdrop-blur-xl rounded-2xl border border-indigo-200/50 dark:border-indigo-800/50 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-lg transition-all duration-300">
                      <feature.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      <div className="text-left">
                        <h3 className="font-bold text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}