'use client';
import React, { FC, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Photo } from '@/app/types';

interface PhotoModalProps {
  photo: Photo;
  onClose: () => void;
}

const PhotoModal: FC<PhotoModalProps> = ({ photo, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${photo.filePath}`;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[80vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        <Image
          src={imageUrl}
          alt={photo.originalName || 'Photo'}
          width={1200}
          height={800}
          className="object-contain rounded-lg"
          priority
          sizes="(max-width: 768px) 100vw, 90vw"
        />
      </div>
    </div>
  );
};

export default PhotoModal;