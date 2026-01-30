export interface AuthTokens {
  access: string;
  refresh: string;
  role?: string;
  email_verified?: boolean;
}

export const AUTH_STORAGE_KEY = 'ahelp_auth';

export const saveAuthTokens = (tokens: AuthTokens) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(tokens));
  }
};

export const getAuthTokens = (): AuthTokens | null => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
  }
  return null;
};

export const clearAuthTokens = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
};

export const getAccessToken = (): string | null => {
  const tokens = getAuthTokens();
  return tokens?.access || null;
};

export const getUserRole = (): string | null => {
  const tokens = getAuthTokens();
  return tokens?.role || null;
};

export const isEmailVerified = (): boolean => {
  const tokens = getAuthTokens();
  return tokens?.email_verified || false;
};

