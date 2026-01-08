export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
    DELETE_ACCOUNT: '/auth/account',
  },
  ALBUMS: {
    LIST: '/albums',
    CREATE: '/albums',
    GET: (id: number) => `/albums/${id}`,
    UPDATE: (id: number) => `/albums/${id}`,
    DELETE: (id: number) => `/albums/${id}`,
  },
  PHOTOS: {
    BY_ALBUM: (id: number) => `/photos/album/${id}`,
    BY_DATE_RANGE: '/photos/date-range',
    UPLOAD: (id: number) => `/photos/album/${id}`,
    DELETE: (id: number) => `/photos/${id}`,
    BATCH_DELETE: '/photos/batch/delete',
    FAVORITE: (id: number) => `/photos/${id}/favorite`,
  },
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Your session has expired. Please log in again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  FILE_UPLOAD_ERROR: 'File upload failed. Please try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
} as const;

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'You have been logged in successfully.',
  LOGOUT_SUCCESS: 'You have been logged out.',
  ALBUM_CREATED: 'Album created successfully.',
  ALBUM_UPDATED: 'Album updated successfully.',
  ALBUM_DELETED: 'Album deleted successfully.',
  PHOTOS_UPLOADED: 'Photos uploaded successfully.',
  PHOTO_DELETED: 'Photo deleted successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
} as const;