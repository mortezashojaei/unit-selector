import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignupForm from "Components/Signup Form/SignupForm";
import loginForm from "Components/login-form/loginForm";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup" component={SignupForm} />
        <Route path="/login" component={loginForm} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
