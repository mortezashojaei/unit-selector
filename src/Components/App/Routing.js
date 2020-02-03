import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import CourseBox from "../Dashboard/CourseBox/CourseBox";
import Dashboard from "Components/Dashboard/Dashboard";
import NotFound from "Components/NotFound/NotFound";
import Calender from "Components/Calender/Calender";
import Edit from "Components/Welcome/Edit/Edit";
import AuthProvider from "Utils/Authentication/AuthProvider";
import Interceptor from "Utils/Interceptor";
import PrivateRoute from "Utils/Authentication/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Interceptor>
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
            <PrivateRoute path="/dashboard" exact>
              <Dashboard />
            </PrivateRoute>
            <Route path="/calender" exact component={Calender} />
            <PrivateRoute path="/edit" exact>
              <Edit />
            </PrivateRoute>
            <Route component={NotFound} />
          </Switch>
        </Interceptor>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
