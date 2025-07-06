import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Star, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CommunityApp {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  author: string;
  likes: number;
  views: number;
  url: string;
}

const CommunityShowcase: React.FC = () => {
  const { t } = useTranslation();

  const communityApps: CommunityApp[] = [
    {
      id: '1',
      title: 'TaskFlow Pro',
      description: 'A beautiful project management dashboard with real-time collaboration features.',
      category: 'Productivity',
      image: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=250&fit=crop',
      author: 'Sarah Chen',
      likes: 234,
      views: 1520,
      url: '#'
    },
    {
      id: '2',
      title: 'EcoTracker',
      description: 'Track your carbon footprint and discover sustainable living tips.',
      category: 'Lifestyle',
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=250&fit=crop',
      author: 'Mike Rodriguez',
      likes: 189,
      views: 980,
      url: '#'
    },
    {
      id: '3',
      title: 'Recipe Vault',
      description: 'Organize your favorite recipes with smart meal planning features.',
      category: 'Food & Drink',
      image: 'https://images.unsplash.com/photo-1602576666092-bf6447a729fc?w=400&h=250&fit=crop',
      author: 'Emma Thompson',
      likes: 312,
      views: 2100,
      url: '#'
    },
    {
      id: '4',
      title: 'FitnessPal',
      description: 'Personal trainer in your pocket with custom workout plans.',
      category: 'Health',
      image: 'https://images.unsplash.com/photo-1602064172250-43f8909056c7?w=400&h=250&fit=crop',
      author: 'Alex Kim',
      likes: 445,
      views: 3200,
      url: '#'
    },
    {
      id: '5',
      title: 'StudyBuddy',
      description: 'Collaborative learning platform for students and educators.',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1587355760421-b9de3226a046?w=400&h=250&fit=crop',
      author: 'Lisa Park',
      likes: 278,
      views: 1800,
      url: '#'
    },
    {
      id: '6',
      title: 'CryptoWatch',
      description: 'Real-time cryptocurrency portfolio tracker with advanced analytics.',
      category: 'Finance',
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=250&fit=crop',
      author: 'David Wilson',
      likes: 567,
      views: 4100,
      url: '#'
    }
  ];

  // Duplicate the apps array to create seamless infinite scroll
  const duplicatedApps = [...communityApps, ...communityApps];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('community.title', 'Built by the Community')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('community.subtitle', 'Discover amazing apps created by developers around the world using Kliv')}
          </p>
        </div>
      </div>

      {/* Scrolling Carousel */}
      <div className="relative">
        <div className="flex animate-scroll-left space-x-6 w-max">
          {duplicatedApps.map((app, index) => (
            <Card key={`${app.id}-${index}`} className="w-80 flex-shrink-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={app.image} 
                  alt={app.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    {app.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                    {app.title}
                  </h3>
                  <Button variant="ghost" size="sm" className="p-1 h-auto">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                  {app.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="font-medium">by {app.author}</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{app.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{app.views}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
          {t('community.cta', 'Share Your Creation')}
        </Button>
      </div>
    </section>
  );
};

export default CommunityShowcase;