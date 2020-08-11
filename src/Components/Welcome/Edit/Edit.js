import React, { useState, useEffect } from "react";
import styles from "../SignupContainer/SignupContainer.module.scss";
import styles2 from "../../Dashboard/Dashboard.module.scss";
import NavBar from "../../Dashboard/NavBar/NavBar";
import Layout from "../../Dashboard/Layout/Layout";
import SignupForm from "../SignupContainer/SignupForm/SignupForm";
import { info } from "Utils/ApiCalls/Auth";
const Edit = (props) => {
  const [data, setData] = useState({});
  useEffect(() => {
    info().then(function (response) {
      if (response.data) setData(response.data.data);
    });
  }, []);

  return (
      <Layout pageName="ویرایش مشخصات">
      <div className={styles.signupContainer}>
        <SignupForm key="signupForm" isEdit={true} {...data} />
      </div>
      </Layout> 
  );
};

export default Edit;
