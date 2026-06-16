import React, { createContext, useState, useContext, useEffect } from 'react';
import { USERS } from '../api/data';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('dpms_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (username, password, role) => {
    const foundUser = USERS.find(
      u => u.name === username && u.password === password && u.role === role
    );
    if (foundUser) {
      const userData = { ...foundUser };
      setUser(userData);
      localStorage.setItem('dpms_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dpms_user');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    isPM: user?.role === 'PM',
    isCM: user?.role === 'CM',
    isMinister: user?.role === 'Minister',
    isMP: user?.role === 'MP',
    isMLA: user?.role === 'MLA',
    isUser: user?.role === 'USER',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};