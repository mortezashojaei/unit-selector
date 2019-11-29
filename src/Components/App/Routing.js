import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import SignupForm from "Components/Signup Form/SignupForm";
import loginForm from "Components/login-form/LoginForm";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" exact component={SignupForm} />
        <Route path="/login" exact component={loginForm} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
