'use client';
import React, { FC } from 'react';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { Photo } from '@/app/types';

interface PhotoCardProps {
  photo: Photo;
  onDelete: (id: number) => void;
  onClick?: () => void;
}

const PhotoCard: FC<PhotoCardProps> = ({ photo, onDelete, onClick }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this photo?')) {
      onDelete(photo.id);
    }
  };

  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${photo.filePath}`;

  return (
    <div
      onClick={onClick}
      className="group relative bg-gray-200 rounded-lg overflow-hidden aspect-square cursor-pointer hover:shadow-lg transition-all duration-300"
    >
      <Image
        src={imageUrl}
        alt={photo.originalName || 'Photo'}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
        title="Delete photo"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PhotoCard;