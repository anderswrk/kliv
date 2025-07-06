import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AppPreviewModal } from './AppPreviewModal';
import { useTranslation } from 'react-i18next';

interface App {
  name: string;
  description: string;
  organizationName: string;
  imageUrl: string;
  category: string;
  uuid: string;
}

export function CommunityShowcase() {
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
        setApps([]);
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

  // Duplicate apps for seamless infinite scroll
  const duplicatedApps = [...apps, ...apps];

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-pink-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('community.title')}</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover amazing apps built by our community. Click on any app to preview it or remix it for your own project.
            </p>
          </div>
          
          {/* Scrolling Container */}
          <div className="relative">
            <div className="flex animate-scroll-left space-x-6 w-max">
              {duplicatedApps.map((app, i) => (
                <Card 
                  key={`${app.uuid}-${i}`}
                  className="flex-shrink-0 w-80 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:scale-105 hover:-translate-y-1"
                  onClick={() => handleAppClick(app)}
                >
                  <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                    <img
                      src={app.imageUrl || '/placeholder.svg'}
                      alt={app.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      onError={e => (e.currentTarget.src = '/placeholder.svg')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
                        {app.name}
                      </CardTitle>
                      <Badge variant="secondary" className="ml-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-700 dark:text-purple-300 border-0">
                        {app.category}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 w-8 h-8 flex items-center justify-center mr-3 text-white font-bold text-xs">
                        {app.organizationName?.[0]?.toUpperCase() || '?'}
                      </div>
                      <span className="truncate">{app.organizationName}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Gradient overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-pink-50 to-transparent dark:from-gray-900 dark:to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-pink-50 to-transparent dark:from-gray-900 dark:to-transparent pointer-events-none z-10" />
          </div>
          
          {/* Pause on hover hint */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Hover over any app to pause the scroll and explore
            </p>
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
}