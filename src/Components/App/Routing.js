import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Welcome from "../Welcome/Welcome";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          render={routeProps => <Redirect {...routeProps} to="/login" />}
        />
        <Route path="/signup" exact component={Welcome} />
        <Route path="/login" exact component={Welcome} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
