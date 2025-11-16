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
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background overflow-hidden relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,107,107,0.05),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 mb-12 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-5 py-2.5 bg-accent/10 dark:bg-accent/20 border border-accent/20 dark:border-accent/30 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              <span className="text-accent">Built by Creators</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-[1.1]">
              <span className="text-gradient">
                {t('community.title')}
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
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
                className="w-[360px] flex-shrink-0 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-2 bg-card/80 dark:bg-card/60 backdrop-blur-xl border border-border/50 shadow-xl cursor-pointer overflow-hidden group"
                onClick={() => handleAppClick(app)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={app.imageUrl || '/placeholder.svg'} 
                    alt={app.name}
                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={e => (e.currentTarget.src = '/placeholder.svg')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-background/90 dark:bg-background/80 backdrop-blur-sm text-foreground border-0 shadow-lg">
                      {app.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {app.name}
                    </h3>
                    <Button variant="ghost" size="sm" className="p-1 h-auto hover:text-primary">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                    {app.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="rounded-full bg-gradient-to-br from-primary to-accent w-7 h-7 flex items-center justify-center mr-2 text-xs font-bold text-white">
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