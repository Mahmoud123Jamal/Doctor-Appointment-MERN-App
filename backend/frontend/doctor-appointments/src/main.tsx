import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./components/ToastProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider position="top-center" autoClose={2000}>
        <App />
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
);
