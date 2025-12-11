import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./styles/main.scss";
import App from "./App.tsx";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with id='root' not found in index.html");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
