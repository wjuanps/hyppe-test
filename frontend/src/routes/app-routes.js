import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Profile from "../pages/Profile";
import NewEvent from "../pages/NewEvent";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/profile" exact component={Profile} />
        <Route path="/events/new" exact component={NewEvent} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
