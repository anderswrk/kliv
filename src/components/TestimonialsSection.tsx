import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Testimonial {
  quote: string;
  author: string;
  title: string;
}

const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation();

  const testimonials: Testimonial[] = [
    {
      quote: t('testimonials.githubIntegration'),
      author: t('testimonials.emmaChenAuthor'),
      title: t('testimonials.emmaChenTitle'),
    },
    {
      quote: t('testimonials.launchedFaster'),
      author: t('testimonials.carlosAuthor'),
      title: t('testimonials.carlosTitle'),
    },
    {
      quote: t('testimonials.clientSiteUp'),
      author: t('testimonials.yukiAuthor'),
      title: t('testimonials.yukiTitle'),
    },
    {
      quote: t('testimonials.onlineStoreConfused'),
      author: t('testimonials.jenniferAuthor'),
      title: t('testimonials.jenniferTitle'),
    },
    {
      quote: t('testimonials.noHostingAccounts'),
      author: t('testimonials.alexKAuthor'),
      title: t('testimonials.alexKTitle'),
    },
    {
      quote: t('testimonials.featuresNeeded'),
      author: t('testimonials.lucasAuthor'),
      title: t('testimonials.lucasTitle'),
    },
    {
      quote: t('testimonials.learnedToCode'),
      author: t('testimonials.mohamedAuthor'),
      title: t('testimonials.mohamedTitle'),
    },
    {
      quote: t('testimonials.japaneseExplanation'),
      author: t('testimonials.keikoAuthor'),
      title: t('testimonials.keikoTitle'),
    },
    {
      quote: t('testimonials.ideaToLive'),
      author: t('testimonials.rachelAuthor'),
      title: t('testimonials.rachelTitle'),
    },
    {
      quote: t('testimonials.threeSites'),
      author: t('testimonials.diegoAuthor'),
      title: t('testimonials.diegoTitle'),
    },
  ];

  // Duplicate the testimonials array to create seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            What our users say about Kliv
          </p>
        </div>
      </div>

      {/* Scrolling Carousel */}
      <div className="relative">
        <div className="flex animate-scroll-left space-x-6 w-max">
          {duplicatedTestimonials.map((testimonial, index) => (
            <Card key={`${testimonial.author}-${index}`} className="w-96 flex-shrink-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <p className="text-gray-700 dark:text-gray-300 text-lg italic mb-4 line-clamp-3">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${testimonial.author}`} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
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