import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { NotificationProvider } from "./context/NotificationContext";
import { AuthProvider } from "./context/AuthProvider"; // <-- Correct import

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
