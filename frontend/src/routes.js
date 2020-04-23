import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppRoutes from "./routes/app-routes";
import AuthRoutes from "./routes/auth-routes";

import auth from "./services/auth";

export default function Routes() {
  return (
    auth.isAuthenticated ? <AppRoutes /> : <AuthRoutes />
  );
}
