import React, { useState, useCallback } from "react";
import { Dialogues } from "../../../../Utils/Dialogues";
import styles from "./InitialSignup.module.scss";
import { isEmailValid } from "Utils/formValidators";
import { doesEmailExist } from "Utils/ApiCalls/Auth";
import Swal from "sweetalert2/dist/sweetalert2.js";

const InitialSignup = (props) => {
  const [email, setEmail] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [doesExist, setDoesExist] = useState(false);
  const [isEmailFormatValid, setIsEmailFormatValid] = useState(true);
  const onEmailNameChange = useCallback((e) => {
    setEmail(e.target.value);
    setIsEmpty(false);
    setDoesExist(false);
    setIsEmailFormatValid(true);
  }, []);
  const onSubmit = (e) => {
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
          .catch((data) => {
            setDoesExist(true);
            Swal.fire({
              icon: "error",
              title: Dialogues.error,
              text: Dialogues.userAlreadyExists,
            });
          });
      } else {
        setIsEmailFormatValid(false);
        Swal.fire({
          icon: "error",
          title: Dialogues.error,
          text: Dialogues.wrongEmailFormat,
        });
      }
    } else if (!email || (email && !email.trim().length > 0)) {
      setIsEmpty(true);
      Swal.fire({
        icon: "error",
        title: Dialogues.error,
        text: Dialogues.emailCantBeEmpty,
      });
    }
  };
  return (
    <form onSubmit={onSubmit} className={styles.initialSignupForm}>
      <label>
        {email && <span>{Dialogues.emailPlaceholder}</span>}
        <input
          className={`${
            (isEmpty || doesExist || !isEmailFormatValid) && styles.error
          }`}
          value={email}
          onChange={onEmailNameChange}
          placeholder={Dialogues.emailPlaceholder}
          type="text"
        />
        {isEmpty ? (
          <p>{`${Dialogues.emailPlaceholder} ${Dialogues.cantBeEmpty}`}</p>
        ) : !isEmailFormatValid ? (
          <p>{Dialogues.emailFormatError}</p>
        ) : (
          doesExist && <p>{Dialogues.userWithThisEmailAlreadyExists}</p>
        )}
      </label>
      <button>{Dialogues.signup}</button>
    </form>
  );
};

export default InitialSignup;
