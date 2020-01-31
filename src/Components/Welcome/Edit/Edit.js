import React from "react";
import styles from "./Edit.Module.scss";
import SignupForm from "../SignupContainer/SignupForm/SignupForm";
import { info } from "Utils/ApiCalls/Auth";
const Edit = (props) => {
  const data;
  info().then(function(response) {
    if (response.data.StatusCode == 200)
      data= response.data;
    else return data = {};
  });
  return (
<div className={styles.signupContainer}>
        <SignupForm key="signupForm" isEdit={true} {...data} />
    </div>
  );
};

export default Edit;
