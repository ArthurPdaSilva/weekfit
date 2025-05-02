import { AxiosResponse } from "axios";
import { createContext, JSX, useEffect, useState } from "react";
import { UserSchemaModel } from "../@types/UserType";
import api from "../services/api";

interface AppContextInterface {
  signed: boolean;
  token: string | null;
  user: UserSchemaModel | null;
  login: ({ email, password }: UserSchemaModel) => Promise<void>;
  register: ({ name, password, email }: UserSchemaModel) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AppContextInterface | null>(null);

export default function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<UserSchemaModel | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadingStoreData = () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        setToken(JSON.parse(storageToken));
      }
    };
    loadingStoreData();
  }, []);

  const login = async ({ email, password }: UserSchemaModel) => {
    console.log(password);
    const fakeUser: UserSchemaModel = {
      id: "fake-id-12345",
      name: "Fake User",
      email,
      password,
    };
    const fakeToken = "fake-token-12345";

    localStorage.setItem("@Auth:user", JSON.stringify(fakeUser));
    localStorage.setItem("@Auth:token", JSON.stringify(fakeToken));

    setUser(fakeUser);
    setToken(fakeToken);
  };

  const register = async ({ name, password, email }: UserSchemaModel) => {
    const fakeUser: UserSchemaModel = {
      id: "fake-id-12345",
      name,
      email,
      password,
    };
    const fakeToken = "fake-token-12345";

    localStorage.setItem("@Auth:user", JSON.stringify(fakeUser));
    localStorage.setItem("@Auth:token", JSON.stringify(fakeToken));

    setUser(fakeUser);
    setToken(fakeToken);
  };

  const auth = (response: AxiosResponse<any, any>) => {
    if (response.data.error) window.alert(response.data.error);
    else {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      localStorage.setItem("@Auth:token", JSON.stringify(response.data.token));
      const user: UserSchemaModel = {
        name: response.data.name,
        email: response.data.email,
        password: response.data.password,
      };
      localStorage.setItem("@Auth:user", JSON.stringify(user));
      return user;
    }
  };

  const logout = () => {
    localStorage.removeItem("@Auth:token");
    localStorage.removeItem("@Auth:user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, signed: !!user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
