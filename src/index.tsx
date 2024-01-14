import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";

const root = ReactDOM.createRoot(
  document.getElementById("content") as HTMLElement
);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
