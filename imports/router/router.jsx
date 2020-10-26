import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import App from "/imports/ui/App";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/:route" component={App} />
        <Redirect to="/home" />
      </Switch>
    </Router>
  );
}
