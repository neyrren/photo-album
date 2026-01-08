import React, { FC } from 'react';
import AlbumCard from './AlbumCard';
import { Album } from '@/app/types';

interface AlbumGridProps {
  albums: Album[];
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

const AlbumGrid: FC<AlbumGridProps> = ({ albums, onDelete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-64 bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (albums.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No albums yet. Create one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default AlbumGrid;