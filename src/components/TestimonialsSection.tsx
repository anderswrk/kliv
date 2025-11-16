import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Testimonial {
  quote: string;
  author: string;
  title: string;
}

const TestimonialsSection = () => {
  const { t } = useTranslation();

  const testimonialKeys = [
    {
      quote: 'testimonials.githubIntegration',
      author: 'testimonials.emmaChenAuthor',
      title: 'testimonials.emmaChenTitle',
    },
    {
      quote: 'testimonials.launchedFaster',
      author: 'testimonials.carlosAuthor',
      title: 'testimonials.carlosTitle',
    },
    {
      quote: 'testimonials.clientSiteUp',
      author: 'testimonials.yukiAuthor',
      title: 'testimonials.yukiTitle',
    },
    {
      quote: 'testimonials.onlineStoreConfused',
      author: 'testimonials.jenniferAuthor',
      title: 'testimonials.jenniferTitle',
    },
    {
      quote: 'testimonials.noHostingAccounts',
      author: 'testimonials.alexKAuthor',
      title: 'testimonials.alexKTitle',
    },
    {
      quote: 'testimonials.featuresNeeded',
      author: 'testimonials.lucasAuthor',
      title: 'testimonials.lucasTitle',
    },
    {
      quote: 'testimonials.learnedToCode',
      author: 'testimonials.mohamedAuthor',
      title: 'testimonials.mohamedTitle',
    },
    {
      quote: 'testimonials.japaneseExplanation',
      author: 'testimonials.keikoAuthor',
      title: 'testimonials.keikoTitle',
    },
    {
      quote: 'testimonials.ideaToLive',
      author: 'testimonials.rachelAuthor',
      title: 'testimonials.rachelTitle',
    },
    {
      quote: 'testimonials.threeSites',
      author: 'testimonials.diegoAuthor',
      title: 'testimonials.diegoTitle',
    },
  ];

  const testimonials: Testimonial[] = testimonialKeys.map(keys => ({
    quote: t(keys.quote),
    author: t(keys.author),
    title: t(keys.title),
  }));

  // Duplicate the testimonials array to create seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,119,255,0.05),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 mb-12 relative">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center px-5 py-2.5 bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            <span className="text-primary">Trusted by Builders</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-[1.1]">
            <span className="text-gradient">
              {t('testimonials.title')}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            What our users say about Kliv
          </p>
        </div>
      </div>

      {/* Scrolling Carousel */}
      <div className="relative">
        <div className="flex animate-scroll-left space-x-6 w-max">
          {duplicatedTestimonials.map((testimonial, index) => (
            <Card key={`${testimonial.author}-${index}`} className="w-[420px] flex-shrink-0 bg-card/80 dark:bg-card/60 backdrop-blur-xl border border-border/50 shadow-xl hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <p className="text-foreground text-lg mb-6 line-clamp-3 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <Avatar className="h-14 w-14 mr-4 ring-2 ring-primary/10">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${testimonial.author}`} alt={testimonial.author} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;