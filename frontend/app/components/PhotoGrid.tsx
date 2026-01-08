'use client';
import React, { FC, useState } from 'react';
import PhotoCard from './PhotoCard';
import PhotoModal from './PhotoModal';
import { Photo, PhotosByDate } from '@/app/types';
import { formatDate } from '@/app/utils/formatDate';

interface PhotoGridProps {
  groupedPhotos: PhotosByDate;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

const PhotoGrid: FC<PhotoGridProps> = ({ groupedPhotos, onDelete, isLoading }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-8">
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, j) => (
                <div
                  key={j}
                  className="aspect-square bg-gray-200 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const dates = Object.keys(groupedPhotos).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  if (dates.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No photos yet. Upload some to get started!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {dates.map((date) => (
          <div key={date}>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-primary-500">
              {formatDate(date)}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {groupedPhotos[date].map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  onDelete={onDelete}
                  onClick={() => setSelectedPhoto(photo)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </>
  );
};

export default PhotoGrid;