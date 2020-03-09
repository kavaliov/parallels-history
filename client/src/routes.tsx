import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  Auth,
  GridLine,
  TimelinesList,
  Timeline,
  CreatePeriod,
  Period,
  Registration
} from "./features";

export const useRoutes = (isAuth: boolean) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/timeline-list" exact>
          <TimelinesList />
        </Route>
        <Route path="/timeline/:id" exact>
          <Timeline />
        </Route>
        <Route path="/period/:id" exact>
          <Period />
        </Route>
        <Route path="/period/create/:id">
          <CreatePeriod />
        </Route>
        <Route path="/" exact>
          <GridLine />
        </Route>
        <Redirect to="/timeline-list" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <GridLine />
      </Route>
      <Route path="/auth" exact>
        <Auth />
      </Route>
      <Route path="/registration" exact>
        <Registration />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
