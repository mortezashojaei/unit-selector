import React, { useState } from "react";
import InitialSignup from "../InitialSignup/InitialSignup";
import SignupForm from "../SignupForm/SignupForm";

const SignupContainer = props => {
  const [isFirstSignupDone, setIsFirstSignupDone] = useState(false);
  const [userName, setUserName] = useState();
  const initialSubmit = userName => {
    setIsFirstSignupDone(true);
    setUserName(userName);
    console.log(userName);
  };
  let form = isFirstSignupDone ? (
    <SignupForm userName={userName} />
  ) : (
    <InitialSignup submitted={initialSubmit} />
  );
  return <SignupForm />;
};

export default SignupContainer;
