export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: UserRole;
  contact?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export type UserRole = 'admin' | 'manager' | 'employee' | 'customer';

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: UserRole) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
  role: UserRole;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  role: UserRole;
  contact?: string;
}