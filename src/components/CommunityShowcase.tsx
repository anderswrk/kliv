import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { AppPreviewModal } from './AppPreviewModal';

interface App {
  name: string;
  description: string;
  organizationName: string;
  imageUrl: string;
  category: string;
  uuid: string;
}

export function CommunityShowcase() {
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
    // This should trigger the same functionality as submitting a prompt
    // For now, we'll just log the appId - this will need to be connected to the main app logic
    console.log('Remix app with ID:', appId);
    
    // In a real implementation, this would:
    // 1. Navigate to the main page
    // 2. Set the prompt input to the appId
    // 3. Submit the form automatically
    
    // For now, we can simulate this by dispatching a custom event
    window.dispatchEvent(new CustomEvent('remix-app', { detail: { appId } }));
  };

  if (!apps.length) return null;

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-pink-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">From the Community</h2>
            <Link to="/appstore" className="text-blue-600 font-medium hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {apps.map((app, i) => (
              <Card 
                key={i} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleAppClick(app)}
              >
                <div className="aspect-video bg-gray-100">
                  <img
                    src={app.imageUrl || '/placeholder.svg'}
                    alt={app.name}
                    className="w-full h-full object-cover"
                    onError={e => (e.currentTarget.src = '/placeholder.svg')}
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <CardTitle className="text-base font-semibold truncate flex-1">{app.name}</CardTitle>
                    <Badge variant="secondary" className="ml-2">{app.category}</Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="rounded-full bg-gray-200 w-6 h-6 flex items-center justify-center mr-2 text-xs font-bold uppercase">
                      {app.organizationName?.[0] || '?'}
                    </span>
                    {app.organizationName}
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
}