import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/AppRouter.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
    <AppRouter />
    </StrictMode>
  </AuthProvider>
);
