import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Rocket, Target, TrendingUp, Code, Users, Sparkles } from 'lucide-react';

export function About() {
  const { t } = useTranslation();

  const values = [
    {
      icon: Heart,
      title: t('about.values.accessibility.title'),
      description: t('about.values.accessibility.description')
    },
    {
      icon: Sparkles,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: Target,
      title: t('about.values.empowerment.title'),
      description: t('about.values.empowerment.description')
    },
    {
      icon: Users,
      title: t('about.values.community.title'),
      description: t('about.values.community.description')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <div className="border-b border-border/50 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 px-4 py-2 bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 text-primary hover:bg-primary/20">
                <Heart className="w-4 h-4 mr-2 inline" />
                {t('about.badge')}
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-[1.1]">
                <span className="text-gradient">{t('about.title')}</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {t('about.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Founder's Note Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-5xl mx-auto">
            <Card className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg overflow-hidden">
              <CardContent className="p-8 sm:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    {t('aboutPage.foundersNote.title')}
                  </h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Founder Photo */}
                  <div className="flex-shrink-0">
                    <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl ring-2 ring-border/50">
                      <img 
                        src="/content/images/anders-profile.jpg"
                        alt={t('aboutPage.foundersNote.founderAlt')}
                        className="w-full h-full object-cover"
                        style={{width: '192px'}}
                      />
                    </div>
                  </div>
                  
                  {/* Note Content */}
                  <div className="flex-1 text-muted-foreground space-y-4 text-base leading-relaxed">
                    <p>{t('aboutPage.foundersNote.paragraph1')}</p>
                    <p>{t('aboutPage.foundersNote.paragraph2')}</p>
                    <p>{t('aboutPage.foundersNote.paragraph3')}</p>
                    <p>{t('aboutPage.foundersNote.paragraph4')}</p>
                    <p>{t('aboutPage.foundersNote.paragraph5')}</p>
                    <p>{t('aboutPage.foundersNote.paragraph6')}</p>
                    
                    {/* Signature */}
                    <div className="pt-6 mt-6 border-t border-border/50">
                      <p className="text-foreground font-semibold text-lg">
                        —Anders Olsson, Founder, Kliv
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mission Section */}
        <div className="border-t border-border/50 bg-gradient-to-b from-muted/10 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-4 backdrop-blur-sm">
                  <Target className="w-4 h-4 mr-2 text-primary"/>
                  <span className="text-sm font-semibold text-primary">{t('about.mission.title')}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  {t('about.mission.title')}
                </h2>
              </div>

              <Card className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg">
                <CardContent className="p-8 sm:p-12">
                  <div className="text-muted-foreground space-y-6 text-base leading-relaxed">
                    <p>{t('about.mission.paragraph1')}</p>
                    <p>{t('about.mission.paragraph2')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground text-lg">The principles that guide everything we do</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-xl flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* What is Kliv */}
        <div className="border-t border-border/50 bg-gradient-to-b from-muted/10 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-4 backdrop-blur-sm">
                  <Rocket className="w-4 h-4 mr-2 text-primary"/>
                  <span className="text-sm font-semibold text-primary">Platform</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  {t('aboutPage.whatIsKliv.title')}
                </h2>
              </div>

              <Card className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg">
                <CardContent className="p-8 sm:p-12">
                  <div className="text-muted-foreground space-y-6 text-base leading-relaxed">
                    <p>{t('aboutPage.whatIsKliv.paragraph1')}</p>
                    <p>{t('aboutPage.whatIsKliv.paragraph2')}</p>
                    <p>{t('aboutPage.whatIsKliv.paragraph3')}</p>
                    <p>{t('aboutPage.whatIsKliv.paragraph4')}</p>
                    <p>{t('aboutPage.whatIsKliv.paragraph5')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Where We're Going */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-4 backdrop-blur-sm">
                <TrendingUp className="w-4 h-4 mr-2 text-primary"/>
                <span className="text-sm font-semibold text-primary">Roadmap</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                {t('aboutPage.whereWereGoing.title')}
              </h2>
            </div>

            <Card className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg">
              <CardContent className="p-8 sm:p-12">
                <div className="text-muted-foreground space-y-6 text-base leading-relaxed">
                  <p>{t('aboutPage.whereWereGoing.paragraph1')}</p>
                  <p>{t('aboutPage.whereWereGoing.listIntro')}</p>
                  <div className="space-y-4 my-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 dark:bg-cyan-500/30 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{t('aboutPage.whereWereGoing.features.scheduled.title')}</h3>
                        <p className="text-sm text-muted-foreground">{t('aboutPage.whereWereGoing.features.scheduled.description')}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 dark:bg-emerald-500/30 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{t('aboutPage.whereWereGoing.features.webhooks.title')}</h3>
                        <p className="text-sm text-muted-foreground">{t('aboutPage.whereWereGoing.features.webhooks.description')}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 dark:bg-blue-500/30 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{t('aboutPage.whereWereGoing.features.streaming.title')}</h3>
                        <p className="text-sm text-muted-foreground">{t('aboutPage.whereWereGoing.features.streaming.description')}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 dark:bg-amber-500/30 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-amber-600 dark:bg-amber-400"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{t('aboutPage.whereWereGoing.features.realtime.title')}</h3>
                        <p className="text-sm text-muted-foreground">{t('aboutPage.whereWereGoing.features.realtime.description')}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 dark:bg-purple-500/30 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{t('aboutPage.whereWereGoing.features.vector.title')}</h3>
                        <p className="text-sm text-muted-foreground">{t('aboutPage.whereWereGoing.features.vector.description')}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-500/20 dark:bg-rose-500/30 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-rose-600 dark:bg-rose-400"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{t('aboutPage.whereWereGoing.features.queues.title')}</h3>
                        <p className="text-sm text-muted-foreground">{t('aboutPage.whereWereGoing.features.queues.description')}</p>
                      </div>
                    </div>
                  </div>
                  <p>{t('aboutPage.whereWereGoing.paragraph2')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Investors Section */}
        <div className="border-t border-border/50 bg-gradient-to-b from-muted/10 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-4 backdrop-blur-sm">
                  <TrendingUp className="w-4 h-4 mr-2 text-primary"/>
                  <span className="text-sm font-semibold text-primary">Backed By</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  {t('aboutPage.investors.title')}
                </h2>
              </div>

              <Card className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg">
                <CardContent className="p-8 sm:p-12">
                  <div className="text-muted-foreground space-y-6 text-base leading-relaxed">
                    <p>{t('aboutPage.investors.paragraph1')}</p>
                    <p>
                      {t('aboutPage.investors.paragraph2')}{' '}
                      <a 
                        href="https://rational.ventures/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-semibold"
                      >
                        {t('aboutPage.investors.rationalVentures')}
                      </a>
                      {t('aboutPage.investors.paragraph2Suffix')}
                    </p>
                    <p>
                      {t('aboutPage.investors.paragraph3')}{' '}
                      <a 
                        href="mailto:hello@kliv.dev"
                        className="text-primary hover:underline font-semibold"
                      >
                        hello@kliv.dev
                      </a>
                      {t('aboutPage.investors.paragraph3Suffix')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}