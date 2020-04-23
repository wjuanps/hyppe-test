import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "../pages/Logon";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

export default function AuthRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Logon} exact />
        <Route path="/register" exact component={Register} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
