import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Admin from "./layouts/Admin.jsx";
import Login from "./layouts/Login.jsx";
import withAuth from "./components/withAuth"

function App() {
  return (<Router>

    <Switch>
      {/* <Route path='/' component={Login} /> */}
      <Route path="/sign-in" component={Login} />
      {/* <Route path="/admin" component={withAuth(Admin)} /> */}
      <Route path="/admin" component={Admin} />
    </Switch>
  </Router>
  );
}

export default App;
