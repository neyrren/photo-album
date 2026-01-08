export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateFull = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const groupPhotosByDate = (photos: any[]): Record<string, any[]> => {
  const grouped: Record<string, any[]> = {};
  photos.forEach((photo) => {
    const date = formatDate(photo.uploadedAt);
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(photo);
  });
  return grouped;
};

export const sortPhotosByDate = (
  photos: Record<string, any[]>
): Record<string, any[]> => {
  const sorted: Record<string, any[]> = {};
  const sortedKeys = Object.keys(photos).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );
  sortedKeys.forEach((key) => {
    sorted[key] = photos[key];
  });
  return sorted;
};
