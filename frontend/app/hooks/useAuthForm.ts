'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/app/utils/api';
import { setAuthToken, setUserData } from '@/app/utils/auth';
import { validateEmail, validatePassword } from '@/app/utils/validation';
import { ApiErrorHandler } from '@/app/utils/errors';

interface UseAuthFormReturn {
  isLoading: boolean;
  error: string | null;
  register: (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  clearError: () => void;
}

export const useAuthForm = (): UseAuthFormReturn => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const register = useCallback(
    async (
      username: string,
      email: string,
      password: string,
      confirmPassword: string
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        if (!username || !email || !password) {
          throw new Error('All fields are required');
        }

        if (!validateEmail(email)) {
          throw new Error('Invalid email format');
        }

        if (!validatePassword(password)) {
          throw new Error('Password must be at least 6 characters');
        }

        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }

        const response = await authAPI.register({
          username,
          email,
          password,
          confirmPassword,
        });

        const { token, userId } = response.data;
        setAuthToken(token);
        setUserData({ userId, email });
        router.push('/albums');
      } catch (err) {
        setError(ApiErrorHandler.getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        if (!email || !password) {
          throw new Error('Email and password are required');
        }

        if (!validateEmail(email)) {
          throw new Error('Invalid email format');
        }

        const response = await authAPI.login({ email, password });
        const { token, userId } = response.data;

        setAuthToken(token);
        setUserData({ userId, email });
        router.push('/albums');
      } catch (err) {
        setError(ApiErrorHandler.getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  return { isLoading, error, register, login, clearError };
};
