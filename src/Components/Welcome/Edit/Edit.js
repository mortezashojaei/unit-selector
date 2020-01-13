import React from "react";
import styles from "./Edit.Module.scss";
import SignupForm from "../SignupContainer/SignupForm/SignupForm";
const Edit = (props) => {
  const data = {
    studentNumber:1234,
    major:'camputer',
    semester:98,
    fullName:'amir',
    isEdit:true,
  }
  return (
<div className={styles.signupContainer}>
        <SignupForm key="signupForm" {...data} />
    </div>
  );
};

export default Edit;
