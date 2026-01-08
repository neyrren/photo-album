export interface AuthStore {
  token: string | null;
  userId: number | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  clearError: () => void;
}

export interface AlbumStore {
  albums: Album[];
  currentAlbum: Album | null;
  isLoading: boolean;
  error: string | null;
  setAlbums: (albums: Album[]) => void;
  setCurrentAlbum: (album: Album) => void;
  addAlbum: (album: Album) => void;
  removeAlbum: (id: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export interface PhotoStore {
  photos: PhotosByDate;
  isLoading: boolean;
  error: string | null;
  setPhotos: (photos: PhotosByDate) => void;
  addPhotos: (photos: Photo[]) => void;
  removePhoto: (id: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}
