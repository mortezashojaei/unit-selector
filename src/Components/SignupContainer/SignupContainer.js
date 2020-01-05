import React, { useState } from "react";
import InitialSignup from "../InitialSignup/InitialSignup";
import { CSSTransitionGroup } from "react-transition-group";
import SignupForm from "../SignupForm/SignupForm";
import styles from "./SignupContainer.module.scss";
import "./SignupContainerAnimations.scss";

const SignupContainer = props => {
  const [isFirstSignupDone, setIsFirstSignupDone] = useState(false);
  const [userName, setUserName] = useState();
  const [shouldRenderInitialSignup, setShouldRenderInitialSignup] = useState(
    false
  );
  const initialSubmit = userName => {
    setIsFirstSignupDone(true);
    setUserName(userName);
    console.log(userName);
  };
  let form = undefined;
  if (!isFirstSignupDone) {
    form = <InitialSignup key="initialSignUp" submitted={initialSubmit} />;
  } else {
    form = shouldRenderInitialSignup ? (
      <SignupForm key="signupForm" userName={userName} />
    ) : (
      undefined
    );

    setTimeout(() => {
      setShouldRenderInitialSignup(true);
    }, 400);
  }
  return (
    <>
      <CSSTransitionGroup
        transitionName="signupContainer"
        transitionEnterTimeout={400}
        transitionLeave={true}
        transitionLeaveTimeout={400}
        transitionAppearTimeout={400}
        transitionAppear={true}
      >
        {/* {!isFirstSignupDone && (
          <InitialSignup key="initialSignUp" submitted={initialSubmit} />
        )}
        {isFirstSignupDone && (
          <SignupForm key="signupForm" userName={userName} />
        )} */}

        {form}
      </CSSTransitionGroup>

      {/* <CSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeave={true}
        transitionLeaveTimeout={700}
        transitionAppearTimeout={1000}
        transitionAppear={true}
      >
      
      </CSSTransitionGroup> */}
    </>
  );
};

export default SignupContainer;
