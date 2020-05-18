import React, { useState, useCallback } from "react";
import axios from "axios";
import { Dialogues } from "../../../../Utils/Dialogues";
import styles from "./InitialSignup.module.scss";
import { isEmailValid } from "Utils/formValidators";
import { doesEmailExist } from "Utils/ApiCalls/Auth";
import Swal from "sweetalert2/dist/sweetalert2.js";

const InitialSignup = props => {
  const [email, setEmail] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [doesExist, setDoesExist] = useState(false);
  const [isEmailFormatValid, setIsEmailFormatValid] = useState(true);
  const onEmailNameChange = useCallback(e => {
    setEmail(e.target.value);
    setIsEmpty(false);
    setDoesExist(false);
    setIsEmailFormatValid(true);
  }, []);
  const onSubmit = e => {
    e.preventDefault();
    if (email && email.trim().length > 0) {
      setIsEmpty(false);
      if (isEmailValid(email)) {
        /* check if the email already exists or not,
        if not then move to the next step
        */
        //  UNCOMMENT THIS SECTION when working with the real api
        doesEmailExist({ email })
          .then(() => {
            props.submitted(email);
          })
          .catch(data => {
            setDoesExist(true);
            Swal.fire({
              icon: "error",
              title: "خطا",
              text: "کاربر دیگری با این نام وجود دارد"
            });
          });
      } else {
        setIsEmailFormatValid(false);
        Swal.fire({
          icon: "error",
          title: "خطا",
          text: "فرمت پست الکترونیکی وارد شده نادرست است"
        });
      }
    } else if (!email || (email && !email.trim().length > 0)) {
      setIsEmpty(true);
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "پست الکترونیکی نمی تواند خالی باشد"
      });
    }
  };
  return (
    <form onSubmit={onSubmit} className={styles.initialSignupForm}>
      <label>
        {email && <span>{Dialogues.emailPlaceholder}</span>}
        <input
          className={`${(isEmpty || doesExist || !isEmailFormatValid) &&
            styles.error}`}
          value={email}
          onChange={onEmailNameChange}
          placeholder={Dialogues.emailPlaceholder}
          type="text"
        />
        {isEmpty ? (
          <p>{`${Dialogues.emailPlaceholder} نمیتواند خالی باشد`}</p>
        ) : !isEmailFormatValid ? (
          <p>{Dialogues.emailFormatError}</p>
        ) : (
          doesExist && <p>'کاربر با این ایمیل موجود است'</p>
        )}
      </label>
      <button>{Dialogues.signup}</button>
    </form>
  );
};

export default InitialSignup;
