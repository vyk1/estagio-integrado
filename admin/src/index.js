import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import AdminLayout from "layouts/Admin.jsx";
import Login from "./layouts/Login.jsx";
import { isAuthenticated } from "components/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
    }
  />
);

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/sign-in" component={Login} />
      <PrivateRoute path="/admin" component={props => <AdminLayout {...props} />} />
      <Redirect from="/" to="/sign-in" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
