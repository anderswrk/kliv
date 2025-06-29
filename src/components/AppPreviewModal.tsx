import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[90vw] h-[85vh] p-0 overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between p-4 border-b bg-white">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            {app.name}
          </DialogTitle>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleRemix}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
            >
              {t('community.preview.remix')}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="flex-1 bg-gray-100">
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