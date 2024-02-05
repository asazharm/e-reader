import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AppContextProvider from "@/contexts/AppContext/AppContextProvider.tsx";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
