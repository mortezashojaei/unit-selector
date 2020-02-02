import React, { useState } from "react";
import InitialSignup from "./InitialSignup/InitialSignup";
import { CSSTransitionGroup } from "react-transition-group";
import SignupForm from "./SignupForm/SignupForm";
import styles from "./SignupContainer.module.scss";
import "./SignupContainerAnimations.scss";

const SignupContainer = props => {
  const [isFirstSignupDone, setIsFirstSignupDone] = useState(false);
  const [email, setEmail] = useState();
  const [shouldRenderSignUpForm, setShouldRenderSignUpForm] = useState(false);
  const animationDuration = 600;
  const initialSubmit = email => {
    setIsFirstSignupDone(true);
    setEmail(email);
    console.log(email);
  };
  let form = undefined;

  if (!isFirstSignupDone) {
    form = <InitialSignup key="initialSignUp" submitted={initialSubmit} />;
  } else {
    // reder the sign up form based on the state
    form = shouldRenderSignUpForm ? (
      <SignupForm key="signupForm" email={email} />
    ) : (
      undefined
    );
    /*  change the state only after the animation has finished
    WITHOUT THIS TIMEOUT , the two sign up forms would collapse into 
    each other and break the layout */
    setTimeout(() => {
      setShouldRenderSignUpForm(true);
    }, animationDuration);
  }
  return (
    <>
      <div className={styles.signupContainer}>
        <CSSTransitionGroup
          transitionName="signupContainer"
          transitionEnterTimeout={animationDuration}
          transitionLeave={true}
          transitionLeaveTimeout={animationDuration}
          transitionAppearTimeout={animationDuration}
          transitionAppear={true}
        >
          {form}
        </CSSTransitionGroup>
      </div>
    </>
  );
};

export default SignupContainer;
