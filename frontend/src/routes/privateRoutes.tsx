import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

// eslint-disable-next-line react/prop-types
export default function PrivateRouter({ children }: { children: JSX.Element }) {
  const appContext = useContext(AuthContext);
  return appContext?.signed ? children : <Navigate to="/" />;
}
