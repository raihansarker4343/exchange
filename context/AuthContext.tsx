import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, UserRole } from '../types';
import { api } from '../services/mockApi';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check local storage for persisted session user data
    const storedUser = localStorage.getItem('xp_session_user');
    const token = localStorage.getItem('xp_auth_token');
    
    if (storedUser && token) {
      setState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState(s => ({ ...s, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
  setState(s => ({ ...s, isLoading: true }));
  try {
    const res = await api.login(email, password);

    // 🔥 IMPORTANT: res.user, not res
    const loggedUser = res.user;

    localStorage.setItem('xp_session_user', JSON.stringify(loggedUser));

    setState({
      user: loggedUser,
      isAuthenticated: true,
      isLoading: false,
    });
  } catch (error) {
    setState(s => ({ ...s, isLoading: false }));
    throw error;
  }
};


  const register = async (name: string, email: string, password: string) => {
  setState(s => ({ ...s, isLoading: true }));
  try {
    const res = await api.register(name, email, password);

    const loggedUser = res.user;

    localStorage.setItem('xp_session_user', JSON.stringify(loggedUser));

    setState({
      user: loggedUser,
      isAuthenticated: true,
      isLoading: false,
    });
  } catch (error) {
    setState(s => ({ ...s, isLoading: false }));
    throw error;
  }
};


  const logout = () => {
    localStorage.removeItem('xp_session_user');
    localStorage.removeItem('xp_auth_token');
    setState({ user: null, isAuthenticated: false, isLoading: false });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
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
