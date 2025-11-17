import React from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  image: string;
}

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [api]);

  const testimonialKeys = [
    {
      quote: 'testimonials.githubIntegration',
      author: 'testimonials.emmaChenAuthor',
      title: 'testimonials.emmaChenTitle',
      image: '/content/images/testimonials/emma.png',
    },
    {
      quote: 'testimonials.launchedFaster',
      author: 'testimonials.carlosAuthor',
      title: 'testimonials.carlosTitle',
      image: '/content/images/testimonials/carlos.png',
    },
    {
      quote: 'testimonials.clientSiteUp',
      author: 'testimonials.yukiAuthor',
      title: 'testimonials.yukiTitle',
      image: '/content/images/testimonials/yuki.png',
    },
    {
      quote: 'testimonials.onlineStoreConfused',
      author: 'testimonials.jenniferAuthor',
      title: 'testimonials.jenniferTitle',
      image: '/content/images/testimonials/jennifer.png',
    },
    {
      quote: 'testimonials.noHostingAccounts',
      author: 'testimonials.alexKAuthor',
      title: 'testimonials.alexKTitle',
      image: '/content/images/testimonials/alexk.png',
    },
    {
      quote: 'testimonials.featuresNeeded',
      author: 'testimonials.lucasAuthor',
      title: 'testimonials.lucasTitle',
      image: '/content/images/testimonials/lucas.png',
    },
    {
      quote: 'testimonials.learnedToCode',
      author: 'testimonials.mohamedAuthor',
      title: 'testimonials.mohamedTitle',
      image: '/content/images/testimonials/mohamed.png',
    },
    {
      quote: 'testimonials.japaneseExplanation',
      author: 'testimonials.keikoAuthor',
      title: 'testimonials.keikoTitle',
      image: '/content/images/testimonials/keiko.png',
    },
    {
      quote: 'testimonials.ideaToLive',
      author: 'testimonials.rachelAuthor',
      title: 'testimonials.rachelTitle',
      image: '/content/images/testimonials/rachel.png',
    },
    {
      quote: 'testimonials.threeSites',
      author: 'testimonials.diegoAuthor',
      title: 'testimonials.diegoTitle',
      image: '/content/images/testimonials/diego.png',
    },
  ];

  const testimonials: Testimonial[] = testimonialKeys.map(keys => ({
    quote: t(keys.quote),
    author: t(keys.author),
    title: t(keys.title),
    image: keys.image,
  }));

  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,119,255,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(0,119,255,0.12),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.06),transparent_60%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_60%)]"></div>
      
      <div className="container mx-auto px-4 mb-20 relative">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center px-5 py-2.5 bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            <span className="text-primary">{t('testimonials.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-[1.1]">
            <span className="text-gradient">
              {t('testimonials.title')}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </div>
      </div>

      {/* Magazine-style testimonials carousel */}
      <div className="container mx-auto px-4 relative">
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-6">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-6 md:basis-1/2 lg:basis-1/3">
                {/* Outer container with space for avatar */}
                <div className="relative pt-8 h-full">
                  {/* Avatar positioned at top corner */}
                  <div className="absolute top-2 left-6 z-10">
                    <Avatar className="h-14 w-14 ring-4 ring-background shadow-lg">
                      <AvatarImage src={testimonial.image} alt={testimonial.author} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/90 to-purple-500/90 text-white text-sm font-semibold">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  {/* Inner card */}
                  <div className="group h-full bg-card/40 dark:bg-card/20 backdrop-blur-sm rounded-2xl p-8 pt-12 border border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                  
                  {/* Quote content */}
                  <div className="relative">
                    <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-6 font-normal">
                      {testimonial.quote}
                    </p>
                    
                    {/* Author info */}
                    <div className="border-t border-border/40 pt-4">
                      <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 md:-left-12" />
          <CarouselNext className="-right-4 md:-right-12" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;