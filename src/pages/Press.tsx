import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocalizedLink } from '@/components/LocalizedLink';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Newspaper, Download, Mail, Calendar, Users, Sparkles } from 'lucide-react';

export function Press() {
  const { t } = useTranslation();

  const facts = [
    {
      icon: Calendar,
      label: t('press.facts.founded.label'),
      value: t('press.facts.founded.value')
    },
    {
      icon: Users,
      label: t('press.facts.team.label'),
      value: t('press.facts.team.value')
    },
    {
      icon: Sparkles,
      label: t('press.facts.mission.label'),
      value: t('press.facts.mission.value')
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
                <Newspaper className="w-4 h-4 mr-2 inline" />
                {t('press.badge')}
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-[1.1]">
                <span className="text-gradient">{t('press.title')}</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
                {t('press.subtitle')}
              </p>
              
              {/* Press Contact CTA */}
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 backdrop-blur-sm">
                <Mail className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <div className="text-sm text-muted-foreground">{t('press.contact.alternativeLabel')}</div>
                  <a
                    href="mailto:press@kliv.dev"
                    className="text-primary font-semibold hover:underline"
                  >
                    press@kliv.dev
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Facts */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('press.facts.title')}</h2>
              <p className="text-muted-foreground text-lg">{t('press.facts.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {facts.map((fact, index) => {
                const Icon = fact.icon;
                return (
                  <Card key={index} className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex p-3 bg-primary/10 dark:bg-primary/20 rounded-xl mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">{fact.label}</div>
                      <div className="text-xl font-bold">{fact.value}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* About Kliv */}
        <div className="border-t border-border/50 bg-gradient-to-b from-muted/10 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-4 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 mr-2 text-primary"/>
                  <span className="text-sm font-semibold text-primary">{t('press.about.badge')}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  {t('press.about.title')}
                </h2>
              </div>

              <Card className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg">
                <CardContent className="p-8 sm:p-12">
                  <div className="text-muted-foreground space-y-6 text-base leading-relaxed">
                    <p>{t('press.about.paragraph1')}</p>
                    <p>{t('press.about.paragraph2')}</p>
                    <p>{t('press.about.paragraph3')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Press Assets */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <Card className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg">
              <CardContent className="p-8 sm:p-12 text-center">
                <div className="inline-flex p-4 bg-primary/10 dark:bg-primary/20 rounded-2xl mb-6">
                  <Download className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('press.assets.title')}</h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
                  {t('press.assets.contactForMaterials')}
                </p>
                <LocalizedLink
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {t('press.contact.label')}
                </LocalizedLink>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <Card className="border border-border/50 bg-gradient-to-br from-card/90 via-card/80 to-card/70 dark:from-card/70 dark:via-card/60 dark:to-card/50 backdrop-blur-xl shadow-lg">
              <CardContent className="p-8 sm:p-12 text-center">
                <div className="inline-flex p-4 bg-primary/10 dark:bg-primary/20 rounded-2xl mb-6">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('press.contactSection.title')}</h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
                  {t('press.contactSection.description')} {t('press.contactSection.emailInfo')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <LocalizedLink
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {t('press.contact.label')}
                  </LocalizedLink>
                  <a
                    href="mailto:press@kliv.dev"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    press@kliv.dev
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
