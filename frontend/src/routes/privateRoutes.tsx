import { type JSX, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export default function PrivateRouter({ children }: { children: JSX.Element }) {
  const appContext = useContext(AuthContext);
  return appContext?.signed ? children : <Navigate to="/" />;
}
