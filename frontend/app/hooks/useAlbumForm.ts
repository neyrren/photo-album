'use client';
import { useState, useCallback } from 'react';
import { albumAPI } from '@/app/utils/api';
import { validateAlbumTitle } from '@/app/utils/validation';
import { ApiErrorHandler } from '@/app/utils/errors';
import { Album } from '@/app/types';

interface UseAlbumFormReturn {
  isLoading: boolean;
  error: string | null;
  createAlbum: (title: string, description?: string) => Promise<Album | null>;
  updateAlbum: (
    id: number,
    title: string,
    description?: string
  ) => Promise<Album | null>;
  deleteAlbum: (id: number) => Promise<boolean>;
  clearError: () => void;
}

export const useAlbumForm = (): UseAlbumFormReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const createAlbum = useCallback(
    async (title: string, description?: string): Promise<Album | null> => {
      setIsLoading(true);
      setError(null);

      try {
        if (!validateAlbumTitle(title)) {
          throw new Error('Album title is required (max 100 characters)');
        }

        const response = await albumAPI.create({ title, description });
        return response.data;
      } catch (err) {
        setError(ApiErrorHandler.getErrorMessage(err));
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateAlbum = useCallback(
    async (
      id: number,
      title: string,
      description?: string
    ): Promise<Album | null> => {
      setIsLoading(true);
      setError(null);

      try {
        if (!validateAlbumTitle(title)) {
          throw new Error('Album title is required (max 100 characters)');
        }

        const response = await albumAPI.update(id, { title, description });
        return response.data;
      } catch (err) {
        setError(ApiErrorHandler.getErrorMessage(err));
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deleteAlbum = useCallback(async (id: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await albumAPI.delete(id);
      return true;
    } catch (err) {
      setError(ApiErrorHandler.getErrorMessage(err));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    clearError,
  };
};