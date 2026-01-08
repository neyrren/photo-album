import axios, { AxiosInstance, AxiosError } from 'axios';
import { getAuthToken, removeAuthToken } from './(auth)';
import { ApiError } from '@/app/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      removeAuthToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: { username: string; email: string; password: string; confirmPassword: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data: { username: string; email: string }) =>
    api.put('/auth/profile', data),
  changePassword: (data: { currentPassword: string; newPassword: string; confirmPassword: string }) =>
    api.post('/auth/change-password', data),
  deleteAccount: (data: { password: string }) =>
    api.delete('/auth/account', { data }),
};

// Album API
export const albumAPI = {
  getAll: () => api.get('/albums'),
  getById: (id: number) => api.get(`/albums/${id}`),
  create: (data: { title: string; description?: string }) =>
    api.post('/albums', data),
  update: (id: number, data: { title: string; description?: string }) =>
    api.put(`/albums/${id}`, data),
  delete: (id: number) => api.delete(`/albums/${id}`),
};

// Photo API
export const photoAPI = {
  getByAlbum: (albumId: number) => api.get(`/photos/album/${albumId}`),
  getByDateRange: (startDate: string, endDate: string) =>
    api.get('/photos/date-range', {
      params: { startDate, endDate },
    }),
  upload: (albumId: number, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('photos', file));
    return api.post(`/photos/album/${albumId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  delete: (photoId: number) => api.delete(`/photos/${photoId}`),
  deleteMultiple: (photoIds: number[]) =>
    api.delete('/photos/batch/delete', { data: { photoIds } }),
  toggleFavorite: (photoId: number) =>
    api.post(`/photos/${photoId}/favorite`),
};

export default api;