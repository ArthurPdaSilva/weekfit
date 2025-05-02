import React from 'react';
import { RouterProvider } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import AuthProvider from './contexts/auth';
import Router from './routes';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  );
}
