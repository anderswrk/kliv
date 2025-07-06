import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AppPreviewModal } from './AppPreviewModal';

interface App {
  name: string;
  description: string;
  organizationName: string;
  imageUrl: string;
  category: string;
  uuid: string;
}

const CommunityShowcase: React.FC = () => {
  const { t } = useTranslation();
  const [apps, setApps] = useState<App[]>([]);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/v1/public/appstore?search=' + encodeURIComponent(JSON.stringify({
      startRow: 0, endRow: 12, filterModel: {}
    })))
      .then(res => {
        if (!res.ok) {
          throw new Error('API request failed');
        }
        return res.json();
      })
      .then(data => setApps(data.data || []))
      .catch(error => {
        console.log('API failed, using fallback data:', error);
        // Fallback data with more realistic examples
        setApps([
          {
            name: 'TaskFlow Pro',
            description: 'A beautiful project management dashboard with real-time collaboration features.',
            organizationName: 'Sarah Chen',
            imageUrl: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=250&fit=crop',
            category: 'Productivity',
            uuid: '1'
          },
          {
            name: 'EcoTracker',
            description: 'Track your carbon footprint and discover sustainable living tips.',
            organizationName: 'Mike Rodriguez',
            imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=250&fit=crop',
            category: 'Lifestyle',
            uuid: '2'
          },
          {
            name: 'Recipe Vault',
            description: 'Organize your favorite recipes with smart meal planning features.',
            organizationName: 'Emma Thompson',
            imageUrl: 'https://images.unsplash.com/photo-1602576666092-bf6447a729fc?w=400&h=250&fit=crop',
            category: 'Food & Drink',
            uuid: '3'
          },
          {
            name: 'FitnessPal',
            description: 'Personal trainer in your pocket with custom workout plans.',
            organizationName: 'Alex Kim',
            imageUrl: 'https://images.unsplash.com/photo-1602064172250-43f8909056c7?w=400&h=250&fit=crop',
            category: 'Health',
            uuid: '4'
          },
          {
            name: 'StudyBuddy',
            description: 'Collaborative learning platform for students and educators.',
            organizationName: 'Lisa Park',
            imageUrl: 'https://images.unsplash.com/photo-1587355760421-b9de3226a046?w=400&h=250&fit=crop',
            category: 'Education',
            uuid: '5'
          },
          {
            name: 'CryptoWatch',
            description: 'Real-time cryptocurrency portfolio tracker with advanced analytics.',
            organizationName: 'David Wilson',
            imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=250&fit=crop',
            category: 'Finance',
            uuid: '6'
          }
        ]);
      });
  }, []);

  const handleAppClick = (app: App) => {
    setSelectedApp(app);
    setIsModalOpen(true);
  };

  const handleRemix = (appId: string) => {
    console.log('Remix app with ID:', appId);
    window.dispatchEvent(new CustomEvent('remix-app', { detail: { appId } }));
  };

  if (!apps.length) return null;

  // Duplicate the apps array to create seamless infinite scroll
  const duplicatedApps = [...apps, ...apps];

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
        <div className="container mx-auto px-4 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('community.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('community.subtitle')}
            </p>
          </div>
        </div>

        {/* Scrolling Carousel */}
        <div className="relative">
          <div className="flex animate-scroll-left space-x-6 w-max">
            {duplicatedApps.map((app, index) => (
              <Card 
                key={`${app.uuid}-${index}`} 
                className="w-80 flex-shrink-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg cursor-pointer"
                onClick={() => handleAppClick(app)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={app.imageUrl || '/placeholder.svg'} 
                    alt={app.name}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    onError={e => (e.currentTarget.src = '/placeholder.svg')}
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-gray-700">
                      {app.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                      {app.name}
                    </h3>
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2 text-sm leading-relaxed">
                    {app.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="rounded-full bg-gray-200 w-6 h-6 flex items-center justify-center mr-2 text-xs font-bold uppercase text-gray-700">
                      {app.organizationName?.[0] || '?'}
                    </span>
                    <span className="font-medium">{t('community.by')} {app.organizationName}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <AppPreviewModal
        app={selectedApp}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRemix={handleRemix}
      />
    </>
  );
};

export default CommunityShowcase;