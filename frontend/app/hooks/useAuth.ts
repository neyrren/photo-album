'use client';
import { useState, useEffect, useCallback } from 'react';
import { getAuthToken, isAuthenticated } from '@/app/utils/auth';

interface UseAuthReturn {
  isAuth: boolean;
  isLoading: boolean;
  checkAuth: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = useCallback(() => {
    const authenticated = isAuthenticated();
    setIsAuth(authenticated);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { isAuth, isLoading, checkAuth };
};