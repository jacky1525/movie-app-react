import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { FavoritesProvider } from "./context/FavoritesContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
