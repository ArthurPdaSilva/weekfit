import { CssBaseline, ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/auth";
import Router from "./routes";
import { theme } from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Toaster position="top-right" />
      <CssBaseline />
      <AuthProvider>
        <RouterProvider router={Router} />
      </AuthProvider>
    </ThemeProvider>
  );
}
