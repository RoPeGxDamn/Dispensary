import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  publicRoutes,
  adminRoutes,
  specialistRoutes,
  patientRoutes,
} from "../routes";
import { SIGNIN_ROUTE } from "../utils/const";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

export const AppRouter = observer(() => {
  const { auth } = useContext(Context);
  return (
    <Switch>
      {auth.isAuthenticated &&
        auth.user.role === "ADMIN" &&
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {auth.isAuthenticated &&
        auth.user.role === "PATIENT" &&
        patientRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {auth.isAuthenticated &&
        auth.user.role === "SPECIALIST" &&
        specialistRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      {/* <Redirect to={ SIGNIN_ROUTE }/> */}
    </Switch>
  );
});
