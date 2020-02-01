import React,{useState,useEffect} from "react";
import styles from "./Edit.Module.scss";
import SignupForm from "../SignupContainer/SignupForm/SignupForm";
import { info } from "Utils/ApiCalls/Auth";
const Edit = (props) => {
  const {data,setData}=useState({});
  useEffect(()=>{
    info().then(function(response) {
      if (response.data.StatusCode == 200)
        setData(response.data);
    });
  },[true])
  
  return (
<div className={styles.signupContainer}>
        <SignupForm key="signupForm" isEdit={true} {...data} />
    </div>
  );
};

export default Edit;
