import { AxiosResponse } from 'axios';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import UserType from '../@types/UserType';
import api from '../services/api';

interface AppContextInterface {
  signed: boolean;
  token: string | null;
  user: UserType | null;
  login: ({ email, password }: UserType) => Promise<void>;
  register: ({ name, password, email }: UserType) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AppContextInterface | null>(null);

// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadingStoreData = () => {
      const storageUser = localStorage.getItem('@Auth:user');
      const storageToken = localStorage.getItem('@Auth:token');

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        setToken(JSON.parse(storageToken));
      }
    };
    loadingStoreData();
  }, []);

  const login = async ({ email, password }: UserType) => {
    const response = await api.post('/auth', { email, password });
    const user = auth(response) as UserType;
    setUser(user);
  };

  const register = async ({ name, password, email }: UserType) => {
    const response = await api.post('/create', { name, email, password });
    const user = auth(response) as UserType;
    setUser(user);
  };

  function auth(response: AxiosResponse<any, any>) {
    if (response.data.error) window.alert(response.data.error);
    else {
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      localStorage.setItem('@Auth:token', JSON.stringify(response.data.token));
      const user = { name: response.data.name, tableId: response.data.tableId } as UserType;
      localStorage.setItem('@Auth:user', JSON.stringify(user));
      return user;
    }
  }

  const logout = useCallback(() => {
    localStorage.removeItem('@Auth:token');
    localStorage.removeItem('@Auth:user');
    setUser(null);
  }, [setUser]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user, token, signed: !!user, login, register, logout }}>{children}</AuthContext.Provider>
  );
}
