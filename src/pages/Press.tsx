import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocalizedLink } from '@/components/LocalizedLink';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Newspaper, Download, Mail, Calendar, Users, Sparkles, Palette, FileImage, Type, Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function Press() {
  const { t } = useTranslation();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

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

  const brandColors = [
    {
      name: t('press.brandAssets.colors.primaryBlue.name'),
      hex: '#1768B5',
      hsl: 'hsl(207, 77%, 40%)',
      rgb: 'rgb(23, 104, 181)',
      usage: t('press.brandAssets.colors.primaryBlue.usage')
    },
    {
      name: t('press.brandAssets.colors.accentOrange.name'),
      hex: '#FF6629',
      hsl: 'hsl(16, 100%, 58%)',
      rgb: 'rgb(255, 102, 41)',
      usage: t('press.brandAssets.colors.accentOrange.usage')
    }
  ];

  const logoAssets = [
    {
      name: t('press.brandAssets.logoDownloads.assets.transparentPng.name'),
      file: '/content/resources/media/kliv-transparent.png',
      description: t('press.brandAssets.logoDownloads.assets.transparentPng.description')
    },
    {
      name: t('press.brandAssets.logoDownloads.assets.transparentPng300.name'),
      file: '/content/resources/media/kliv-transparent-300dpi.png',
      description: t('press.brandAssets.logoDownloads.assets.transparentPng300.description')
    },
    {
      name: t('press.brandAssets.logoDownloads.assets.whitePng.name'),
      file: '/content/resources/media/kliv-white.png',
      description: t('press.brandAssets.logoDownloads.assets.whitePng.description')
    },
    {
      name: t('press.brandAssets.logoDownloads.assets.whitePng300.name'),
      file: '/content/resources/media/kliv-white-300dpi.png',
      description: t('press.brandAssets.logoDownloads.assets.whitePng300.description')
    },
    {
      name: t('press.brandAssets.logoDownloads.assets.svg.name'),
      file: '/content/resources/media/kliv.svg',
      description: t('press.brandAssets.logoDownloads.assets.svg.description')
    },
    {
      name: t('press.brandAssets.logoDownloads.assets.eps.name'),
      file: '/content/resources/media/kliv.eps',
      description: t('press.brandAssets.logoDownloads.assets.eps.description')
    },
    {
      name: t('press.brandAssets.logoDownloads.assets.pdf.name'),
      file: '/content/resources/media/kliv.pdf',
      description: t('press.brandAssets.logoDownloads.assets.pdf.description')
    }
  ];

  const copyToClipboard = (text: string, colorName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(colorName);
    setTimeout(() => setCopiedColor(null), 2000);
  };

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

        {/* Brand Assets Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-4 backdrop-blur-sm">
                <FileImage className="w-4 h-4 mr-2 text-primary"/>
                <span className="text-sm font-semibold text-primary">{t('press.brandAssets.badge')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('press.brandAssets.title')}</h2>
              <p className="text-muted-foreground text-lg">{t('press.brandAssets.subtitle')}</p>
            </div>

            {/* Logo Downloads */}
            <Card className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg mb-8">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                    <Download className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{t('press.brandAssets.logoDownloads.title')}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {logoAssets.map((asset, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="font-semibold text-foreground mb-1">{asset.name}</div>
                        <div className="text-sm text-muted-foreground mb-3">{asset.description}</div>
                        <a
                          href={asset.file}
                          download
                          className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                        >
                          <Download className="w-4 h-4" />
                          {t('press.brandAssets.logoDownloads.download')}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Brand Colors */}
            <Card className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg mb-8">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                    <Palette className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{t('press.brandAssets.colors.title')}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {brandColors.map((color, index) => (
                    <div key={index} className="space-y-4">
                      <div 
                        className="w-full h-32 rounded-lg shadow-lg border border-border/50"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div>
                        <h4 className="font-bold text-lg mb-2">{color.name}</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2 p-2 rounded bg-muted/30 text-sm">
                            <span className="text-muted-foreground">HEX:</span>
                            <div className="flex items-center gap-2">
                              <code className="font-mono font-semibold">{color.hex}</code>
                              <button
                                onClick={() => copyToClipboard(color.hex, `${color.name}-hex`)}
                                className="p-1 hover:bg-muted rounded transition-colors"
                                title="Copy to clipboard"
                              >
                                {copiedColor === `${color.name}-hex` ? (
                                  <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Copy className="w-4 h-4 text-muted-foreground" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-2 p-2 rounded bg-muted/30 text-sm">
                            <span className="text-muted-foreground">RGB:</span>
                            <div className="flex items-center gap-2">
                              <code className="font-mono text-xs">{color.rgb}</code>
                              <button
                                onClick={() => copyToClipboard(color.rgb, `${color.name}-rgb`)}
                                className="p-1 hover:bg-muted rounded transition-colors"
                                title="Copy to clipboard"
                              >
                                {copiedColor === `${color.name}-rgb` ? (
                                  <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Copy className="w-4 h-4 text-muted-foreground" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-2 p-2 rounded bg-muted/30 text-sm">
                            <span className="text-muted-foreground">HSL:</span>
                            <div className="flex items-center gap-2">
                              <code className="font-mono text-xs">{color.hsl}</code>
                              <button
                                onClick={() => copyToClipboard(color.hsl, `${color.name}-hsl`)}
                                className="p-1 hover:bg-muted rounded transition-colors"
                                title="Copy to clipboard"
                              >
                                {copiedColor === `${color.name}-hsl` ? (
                                  <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Copy className="w-4 h-4 text-muted-foreground" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-3 italic">{color.usage}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Typography & Usage Guidelines */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                      <Type className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{t('press.brandAssets.typography.title')}</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="font-semibold mb-2">{t('press.brandAssets.typography.primaryFont')}</div>
                      <div className="text-muted-foreground">{t('press.brandAssets.typography.primaryFontValue')}</div>
                    </div>
                    <div>
                      <div className="font-semibold mb-2">{t('press.brandAssets.typography.brandName')}</div>
                      <div className="text-muted-foreground">{t('press.brandAssets.typography.brandNameValue')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{t('press.brandAssets.guidelines.title')}</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{t('press.brandAssets.guidelines.clearSpace')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{t('press.brandAssets.guidelines.proportions')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{t('press.brandAssets.guidelines.whiteLogo')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{t('press.brandAssets.guidelines.contrast')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
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
