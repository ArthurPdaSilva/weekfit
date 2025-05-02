import { RouterProvider } from "react-router-dom";
import "semantic-ui-react/";
import AuthProvider from "./contexts/auth";
import Router from "./routes";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  );
}
