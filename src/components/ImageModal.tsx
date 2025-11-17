import { X, ZoomIn } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  alt: string;
}

export function ImageModal({ isOpen, onClose, imageSrc, alt }: ImageModalProps) {
  console.log('ImageModal render:', { isOpen, imageSrc, alt });
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative w-full h-full flex items-center justify-center p-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close image"
        >
          <X className="h-6 w-6" />
        </button>
        
        {/* Image container */}
        <div 
          className="relative max-w-7xl max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={imageSrc}
            alt={alt}
            className="w-full h-full object-contain rounded-lg shadow-2xl"
            loading="lazy"
          />
          
          {/* Zoom indicator badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
            <ZoomIn className="h-4 w-4" />
            <span>Click outside to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}