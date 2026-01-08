export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  message: string;
  userId: number;
  username?: string;
  email?: string;
  token: string;
}

export interface Album {
  id: number;
  userId?: number;
  title: string;
  description?: string | null;
  photoCount: number;
  totalSize?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Photo {
  id: number;
  albumId?: number;
  filename: string;
  originalName?: string;
  filePath: string;
  fileSize?: number;
  mimeType?: string;
  uploadedAt: string;
}

export interface PhotosByDate {
  [key: string]: Photo[];
}

export interface ApiError {
  error: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
}

export interface UploadResponse {
  message: string;
  uploadedPhotos: Photo[];
  failedUploads?: Array<{ filename: string; error: string }>;
}

export interface DeleteResponse {
  message: string;
}

export interface ProfileUpdateRequest {
  username: string;
  email: string;
}

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
