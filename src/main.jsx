import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LayoutContextProvider } from "./context/LayoutContextProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LayoutContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LayoutContextProvider>
  </StrictMode>
);
