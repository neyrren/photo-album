export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CreateAlbumRequest {
  title: string;
  description?: string;
}

export interface UpdateAlbumRequest {
  title: string;
  description?: string;
}
