import React, { Suspense } from "react";
import { ReactSession } from 'react-client-session';
import { HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

// Estilos CSS
import "./assets/scss/style.scss";

// COMPONENTES
import App from "./App";
import Loader from "./layouts/loader/Loader";

ReactSession.setStoreType("localStorage");

createRoot(document.getElementById("root")).render(
  <Suspense fallback={<Loader />}>
    <HashRouter>
      <App />
    </HashRouter>
  </Suspense>
);

reportWebVitals();
