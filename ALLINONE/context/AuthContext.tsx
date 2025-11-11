import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { users } from '../data/mock';

interface AuthContextType {
  user: User | null;
  login: (email: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('sportify_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (email: string): boolean => {
    // Mock login: find user by email. In a real app, this would be an API call.
    const foundUser = users.find(u => u.email === email);
    if (foundUser) {
        localStorage.setItem('sportify_user', JSON.stringify(foundUser));
        setUser(foundUser);
        return true;
    } else {
        // For simplicity, let's create a new user if not found, except for admin
        if(email === 'admin@sportify.com'){
            return false;
        }
        const newUser: User = {
            id: Date.now(),
            email,
            nickname: email.split('@')[0],
            avatarUrl: `https://picsum.photos/seed/${email}/100/100`,
            role: UserRole.USER
        }
        localStorage.setItem('sportify_user', JSON.stringify(newUser));
        setUser(newUser);
        return true;
    }
  };

  const logout = () => {
    localStorage.removeItem('sportify_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};