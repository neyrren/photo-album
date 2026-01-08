import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const setAuthToken = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, {
    expires: 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
};

export const getAuthToken = (): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  return Cookies.get(TOKEN_KEY);
};

export const removeAuthToken = (): void => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(USER_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const setUserData = (userData: any): void => {
  Cookies.set(USER_KEY, JSON.stringify(userData), {
    expires: 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
};

export const getUserData = (): any => {
  if (typeof document === 'undefined') return null;
  const data = Cookies.get(USER_KEY);
  return data ? JSON.parse(data) : null;
};