import React, { useState } from "react";
import InitialSignup from "./InitialSignup/InitialSignup";
import { CSSTransitionGroup } from "react-transition-group";
import SignupForm from "./SignupForm/SignupForm";
import styles from "./SignupContainer.module.scss";
import "./SignupContainerAnimations.scss";

const SignupContainer = props => {
  const [isFirstSignupDone, setIsFirstSignupDone] = useState(false);
  const [email, setEmail] = useState();
  const [shouldRenderInitialSignup, setShouldRenderInitialSignup] = useState(
    false
  );
  const initialSubmit = email => {
    setIsFirstSignupDone(true);
    setEmail(email);
    console.log(email);
  };
  let form = undefined;
  if (!isFirstSignupDone) {
    form = <InitialSignup key="initialSignUp" submitted={initialSubmit} />;
  } else {
    form = shouldRenderInitialSignup ? (
      <SignupForm key="signupForm" email={email} />
    ) : (
      undefined
    );

    setTimeout(() => {
      setShouldRenderInitialSignup(true);
    }, 600);
  }
  return (
    <>
      <CSSTransitionGroup
        transitionName="signupContainer"
        transitionEnterTimeout={600}
        transitionLeave={true}
        transitionLeaveTimeout={600}
        transitionAppearTimeout={600}
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
