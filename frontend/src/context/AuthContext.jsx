import React from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import { api } from '../api/client.js';

const AuthContext = createContext(null);
const storedUser = localStorage.getItem('miniCrmUser');

export function AuthProvider({ children }) {
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  const persistAuth = (data) => {
    localStorage.setItem('miniCrmToken', data.token);
    localStorage.setItem('miniCrmUser', JSON.stringify(data.user));
    setUser(data.user);
  };

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    persistAuth(data);
  };

  const signup = async (name, email, password) => {
    const { data } = await api.post('/auth/signup', { name, email, password });
    persistAuth(data);
  };

  const logout = () => {
    localStorage.removeItem('miniCrmToken');
    localStorage.removeItem('miniCrmUser');
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, signup, logout, isAuthenticated: Boolean(user) }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
