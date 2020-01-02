import React, { useState, useCallback } from "react";
import { Dialogues } from "../../Utils/Dialogues";
import styles from "./InitialSignup.module.scss";
import { isEmailValid } from "Utils/formValidators";

const InitialSignup = props => {
  const [email, setEmail] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [doesExist, setDoesExist] = useState(false);
  const [isEmailFormatValid, setIsEmailFormatValid] = useState(true);
  const onEmailNameChange = useCallback(e => {
    setEmail(e.target.value);
    setIsEmpty(false);
    setIsEmailFormatValid(true);
  }, []);
  const onSubmit = e => {
    e.preventDefault();
    if (email && email.trim().length > 0) {
      setIsEmpty(false);
      setDoesExist(false);
      if (isEmailValid(email)) {
        props.submitted();
      } else {
        setIsEmailFormatValid(false);
      }
    } else if (!email || (email && !email.trim().length > 0)) {
      setIsEmpty(true);
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
          type="email"
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
