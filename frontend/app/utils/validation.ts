export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validatePasswordStrength = (password: string): {
  isStrong: boolean;
  feedback: string[];
} => {
  const feedback: string[] = [];

  if (password.length < 8) {
    feedback.push('Password should be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    feedback.push('Password should contain uppercase letters');
  }
  if (!/[a-z]/.test(password)) {
    feedback.push('Password should contain lowercase letters');
  }
  if (!/[0-9]/.test(password)) {
    feedback.push('Password should contain numbers');
  }
  if (!/[!@#$%^&*]/.test(password)) {
    feedback.push('Password should contain special characters');
  }

  return {
    isStrong: feedback.length === 0,
    feedback,
  };
};

export const validateFile = (
  file: File
): { isValid: boolean; error?: string } => {
  const allowedMimes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ];
  const maxSize = parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '10485760');

  if (!allowedMimes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Only image files are allowed (jpg, png, gif, webp)',
    };
  }

  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / 1024 / 1024).toFixed(0);
    return {
      isValid: false,
      error: `File size exceeds ${maxSizeMB}MB limit`,
    };
  }

  return { isValid: true };
};

export const validateFiles = (
  files: File[]
): Array<{ filename: string; error: string }> => {
  const errors: Array<{ filename: string; error: string }> = [];
  files.forEach((file) => {
    const validation = validateFile(file);
    if (!validation.isValid) {
      errors.push({
        filename: file.name,
        error: validation.error || 'Invalid file',
      });
    }
  });
  return errors;
};

export const validateUsername = (username: string): boolean => {
  return username.length >= 3 && username.length <= 50;
};

export const validateAlbumTitle = (title: string): boolean => {
  return title.trim().length > 0 && title.length <= 100;
};