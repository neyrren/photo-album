'use client';
import { useState, useCallback } from 'react';
import { photoAPI } from '@/app/utils/api';
import { validateFiles } from '@/app/utils/validation';
import { ApiErrorHandler } from '@/app/utils/errors';
import { UploadResponse } from '@/app/types';

interface UsePhotoUploadReturn {
  isLoading: boolean;
  error: string | null;
  uploadPhotos: (albumId: number, files: File[]) => Promise<UploadResponse | null>;
  deletePhoto: (photoId: number) => Promise<boolean>;
  deletePhotos: (photoIds: number[]) => Promise<boolean>;
  clearError: () => void;
}

export const usePhotoUpload = (): UsePhotoUploadReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const uploadPhotos = useCallback(
    async (
      albumId: number,
      files: File[]
    ): Promise<UploadResponse | null> => {
      setIsLoading(true);
      setError(null);

      try {
        if (files.length === 0) {
          throw new Error('Please select at least one file');
        }

        const validationErrors = validateFiles(files);
        if (validationErrors.length > 0) {
          throw new Error(
            validationErrors[0].error || 'File validation failed'
          );
        }

        const response = await photoAPI.upload(albumId, files);
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

  const deletePhoto = useCallback(async (photoId: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await photoAPI.delete(photoId);
      return true;
    } catch (err) {
      setError(ApiErrorHandler.getErrorMessage(err));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deletePhotos = useCallback(
    async (photoIds: number[]): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        await photoAPI.deleteMultiple(photoIds);
        return true;
      } catch (err) {
        setError(ApiErrorHandler.getErrorMessage(err));
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    error,
    uploadPhotos,
    deletePhoto,
    deletePhotos,
    clearError,
  };
};
