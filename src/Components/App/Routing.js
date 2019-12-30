import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Welcome from "../Welcome/Welcome";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" exact component={Welcome} />
        <Route path="/login" exact component={Welcome} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
