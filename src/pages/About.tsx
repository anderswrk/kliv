import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Lightbulb, Heart } from 'lucide-react';

export function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Header */}
        <div className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Users className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-primary">{t('about.badge')}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                {t('about.title')}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t('about.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-sm mb-16">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold mb-6">{t('about.mission.title')}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {t('about.mission.paragraph1')}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t('about.mission.paragraph2')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="inline-flex p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 mr-4">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">{t('about.values.accessibility.title')}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.values.accessibility.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="inline-flex p-3 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 mr-4">
                      <Lightbulb className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">{t('about.values.innovation.title')}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.values.innovation.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="inline-flex p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 mr-4">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">{t('about.values.empowerment.title')}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.values.empowerment.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="inline-flex p-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 mr-4">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">{t('about.values.community.title')}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.values.community.description')}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Story Section */}
            <Card className="border-0 shadow-sm mb-16">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold mb-6">{t('about.story.title')}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {t('about.story.paragraph1')}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {t('about.story.paragraph2')}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t('about.story.paragraph3')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Technology Section */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold mb-6">{t('about.technology.title')}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {t('about.technology.paragraph1')}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {t('about.technology.paragraph2')}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t('about.technology.paragraph3')}
                  </p>
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