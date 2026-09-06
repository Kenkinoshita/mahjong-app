import { createContext } from 'react';

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';
export type AuthContextType = {
  userId: number | null;
  status: AuthStatus;
  isLoginProcessing: boolean;
  isLogoutProcessing: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
