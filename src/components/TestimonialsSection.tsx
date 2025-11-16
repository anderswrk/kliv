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

  // Show only featured testimonials for a cleaner look
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
      quote: 'testimonials.ideaToLive',
      author: 'testimonials.rachelAuthor',
      title: 'testimonials.rachelTitle',
    },
  ];

  const testimonials: Testimonial[] = testimonialKeys.map(keys => ({
    quote: t(keys.quote),
    author: t(keys.author),
    title: t(keys.title),
  }));

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,119,255,0.05),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 mb-16 relative">
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

      {/* Magazine-style testimonials grid */}
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative group">
              {/* Large decorative quote mark */}
              <div className="absolute -top-4 -left-2 text-8xl font-serif text-primary/20 dark:text-primary/30 leading-none select-none">
                "
              </div>
              
              {/* Quote content */}
              <div className="relative pt-12">
                <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8 italic font-light">
                  {testimonial.quote}
                </p>
                
                {/* Author info with avatar */}
                <div className="flex items-center space-x-4 border-t border-border/30 pt-6">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${testimonial.author}`} alt={testimonial.author} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/80 to-accent/80 text-white text-sm font-semibold">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground text-base">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </div>
              
              {/* Subtle accent line */}
              <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-primary to-transparent opacity-50"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;