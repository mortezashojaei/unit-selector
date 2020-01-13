import React from "react";
import "./Edit.Module.scss";
import SignupForm from "../SignupContainer/SignupForm/SignupForm";
const Edit = (props) => {
  const data = {
    
  }
  return (
    <div className="calender-container">
      <SignupForm key="signupForm" email={email} />
    </div>
  );
};

export default Edit;
