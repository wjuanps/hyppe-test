import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Profile from "../pages/Profile";
import Events from "../pages/Events";
import NewEvent from "../pages/NewEvent";
import DetailEvent from "../pages/DetailEvent";
import EditEvent from "../pages/EditEvent";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/profile" exact component={Profile} />
        <Route path="/events" exact component={Events} />
        <Route path="/events/new" exact component={NewEvent} />
        <Route path="/events/:uuid" exact component={EditEvent} />
        <Route path="/events/:uuid/detail" exact component={DetailEvent} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
