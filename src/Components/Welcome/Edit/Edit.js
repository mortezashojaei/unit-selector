import React, { useState, useEffect } from "react";
import styles from "../SignupContainer/SignupContainer.module.scss";
import styles2 from "../../Dashboard/Dashboard.module.scss";
import styles3 from "./Edit.Module.scss";
import NavBar from "../../Dashboard/NavBar/NavBar";
import SignupForm from "../SignupContainer/SignupForm/SignupForm";
import { info } from "Utils/ApiCalls/Auth";
const Edit = props => {
  const [data,setData] = useState({});
  useEffect(() => {
    info().then(function(response) {
      if (response.data.StatusCode == 200) {setData(response.data.data); console.log(data)}
    });
  },[]);

  return (
    <div>
      <header className={styles2.header}>
        <NavBar />
      </header>
      <div className={styles.signupContainer}>
        <SignupForm key="signupForm" isEdit={true} {...data} />
      </div>
    
    </div>
  );
};

export default Edit;
