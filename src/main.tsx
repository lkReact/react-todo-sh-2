import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/index.scss";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routes from "./common/constants/routes.tsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { getUser } from "./common/services/userManager";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#72A3AA",
      contrastText: "#ffffff",
    },
  },
});


const router = createBrowserRouter(routes);

const clientId=import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <GoogleOAuthProvider clientId={clientId}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
    </GoogleOAuthProvider>;
  </React.StrictMode>,
);
