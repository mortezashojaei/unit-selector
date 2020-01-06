import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import CourseBox from '../CourseBox/CourseBox'

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

        {/*temporary route for test courses component */}
        <Route path="/courses" exact component={CourseBox} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
