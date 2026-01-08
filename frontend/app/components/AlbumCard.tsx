'use client';
import React, { FC } from 'react';
import Link from 'next/link';
import { Trash2, Image } from 'lucide-react';
import { Album } from '@/app/types';

interface AlbumCardProps {
  album: Album;
  onDelete: (id: number) => void;
}

const AlbumCard: FC<AlbumCardProps> = ({ album, onDelete }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this album?')) {
      onDelete(album.id);
    }
  };

  return (
    <Link href={`/albums/${album.id}`}>
      <div className="group relative h-64 rounded-lg overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 bg-white">
        {/* Album Cover */}
        <div className="absolute inset-0 bg-gradient-primary flex items-center justify-center">
          <Image className="w-16 h-16 text-white opacity-50" />
        </div>

        {/* Photo Count Badge */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-medium">
          {album.photoCount} {album.photoCount === 1 ? 'photo' : 'photos'}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 p-2 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
          title="Delete album"
        >
          <Trash2 className="w-5 h-5" />
        </button>

        {/* Album Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent p-4 pt-8">
          <h3 className="text-white font-semibold text-lg truncate">
            {album.title}
          </h3>
          {album.description && (
            <p className="text-gray-300 text-sm truncate">
              {album.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AlbumCard;