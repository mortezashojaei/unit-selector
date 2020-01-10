import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import CourseBox from "../Dashboard/CourseBox/CourseBox";
import Dashboard from "Components/Dashboard/Dashboard";
import NotFound from "Components/NotFound/NotFound";

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
        {/* <Route path="/courses" exact component={CourseBox} /> */}
        <Route path="/dashboard" exact component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
