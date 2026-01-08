'use client';
import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';

interface UseFetchOptions {
  skip?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

interface UseFetchReturn<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export const useFetch = <T,>(
  fetchFn: () => Promise<any>,
  dependencies: any[] = [],
  options: UseFetchOptions = {}
): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { skip = false, onSuccess, onError } = options;

  const refetch = useCallback(async () => {
    if (skip) return;

    try {
      setIsLoading(true);
      const response = await fetchFn();
      setData(response.data);
      setError(null);
      onSuccess?.(response.data);
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>;
      const errorMessage =
        axiosError.response?.data?.error || 'An error occurred';
      setError(errorMessage);
      setData(null);
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, skip, onSuccess, onError]);

  useEffect(() => {
    refetch();
  }, dependencies);

  return { data, error, isLoading, refetch };
};
