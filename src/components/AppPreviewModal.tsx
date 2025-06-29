import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface App {
  name: string;
  description: string;
  organizationName: string;
  imageUrl: string;
  category: string;
  uuid: string;
}

interface AppPreviewModalProps {
  app: App | null;
  isOpen: boolean;
  onClose: () => void;
  onRemix: (appId: string) => void;
}

export function AppPreviewModal({ app, isOpen, onClose, onRemix }: AppPreviewModalProps) {
  const { t } = useTranslation();

  if (!app) return null;

  const iframeUrl = `https://website-${app.uuid}.content.rationalbi.com`;

  const handleRemix = () => {
    onRemix(app.uuid);
    onClose();
  };

  const handleModalScroll = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-6xl w-[90vw] h-[85vh] p-0 overflow-hidden flex flex-col gap-0"
        onWheel={handleModalScroll}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b bg-white shrink-0 pr-16">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            {app.name}
          </DialogTitle>
          <Button
            onClick={handleRemix}
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-sm"
          >
            {t('community.preview.remix')}
          </Button>
        </div>
        <div className="flex-1 bg-gray-100 min-h-0">
          <iframe
            src={iframeUrl}
            className="w-full h-full border-0"
            title={`Preview of ${app.name}`}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}