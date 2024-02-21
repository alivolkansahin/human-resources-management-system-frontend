import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserPreferencesProvider } from "./context/UserPreferencesContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserPreferencesProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </UserPreferencesProvider>
  </React.StrictMode>
);
