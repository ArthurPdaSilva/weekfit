import { type JSX, createContext, useEffect, useState } from "react";
import type { OperationResult } from "../@types/OperationResult";
import type { UserSchemaModel, UserSession } from "../@types/User";
import api from "../services/api";

interface AppContextInterface {
  signed: boolean;
  user: UserSession | null;
  token: string | null;
  login: ({ email, password }: UserSchemaModel) => Promise<void>;
  register: ({ name, password, email }: UserSchemaModel) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AppContextInterface | null>(null);

export default function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const token = localStorage.getItem("@Auth:token");
    if (!token) return;
    const loadStorageData = async () => {
      setToken(token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const response = await api
        .get<OperationResult<UserSession>>("/Session/GetCurrentUser")
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
          return null;
        });

      if (!response) return;
      const { data } = response;

      setUser(data);
    };

    loadStorageData();
  }, [token]);

  const login = async ({ email, password }: UserSchemaModel) => {
    const response = await api
      .post<OperationResult<string>>("/Session/Login", {
        email,
        password,
      })
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return null;
      });

    if (!response) return;
    const { data, isError, message } = response;
    window.alert(message);
    if (isError) {
      return;
    }

    setToken(data);
    localStorage.setItem("@Auth:token", data);
  };

  const register = async ({ name, password, email }: UserSchemaModel) => {
    const response = await api
      .post<OperationResult<string>>("/Session/Register", {
        name,
        email,
        password,
      })
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return null;
      });

    if (!response) return;
    const { data, isError, message } = response;
    window.alert(message);
    if (isError) {
      return;
    }

    setToken(data);
    localStorage.setItem("@Auth:token", data);
  };

  const logout = () => {
    localStorage.removeItem("@Auth:token");
    localStorage.removeItem("@Auth:user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, signed: !!user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
