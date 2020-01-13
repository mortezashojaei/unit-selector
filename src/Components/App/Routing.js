import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import CourseBox from "../Dashboard/CourseBox/CourseBox";
import Dashboard from "Components/Dashboard/Dashboard";
import NotFound from "Components/NotFound/NotFound";
import Calender from "Components/Calender/Calender";
import Edit from "Components/Welcome/Edit/Edit";

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
        <Route path="/calender" exact component={Calender} />
        <Route path="/edit" exact component={Edit} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
