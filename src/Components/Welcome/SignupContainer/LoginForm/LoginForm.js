import React, { useState, useEffect, useCallback } from "react";

import { CSSTransitionGroup } from "react-transition-group";

import { Link } from "react-router-dom";
import styles from "./LoginForm.module.scss";
import { login } from "Utils/ApiCalls/Auth";
import { Dialogues } from "Utils/Dialogues";
import { isEmailValid } from "Utils/formValidators";
import "./LoginFormAnimations.scss";

const LoginForm = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [wrongCredentials, setWrongCredentials] = useState({
    email: false,
    password: false
  });
  const [emptyFields, setEmptyFields] = useState({
    email: false,
    password: false
  });

  /*  with usecallback hook react remembers this function between rerenders,
  and avoids creating a new function every time the compoenent rerenders,
  therefore the rerendering of the child components are avoided */
  const onEmailChange = useCallback(e => {
    setEmail(e.target.value);
    setWrongCredentials(wrongCredentials => ({
      ...wrongCredentials,
      email: false
    }));
  }, []);

  const onPasswordChange = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  /* change the empty fields whenever the inputs change */
  useEffect(() => {
    if (email) {
      setEmptyFields(emptyFields => ({
        ...emptyFields,
        email: false
      }));
    }
    if (password) {
      setEmptyFields(emptyFields => ({
        ...emptyFields,
        password: false
      }));
    }
  }, [email, password]);

  const handleSubmit = e => {
    e.persist();
    e.preventDefault();
    if (!email) {
      setEmptyFields(emptyFields => ({ ...emptyFields, email: true }));
    }
    if (!password) {
      setEmptyFields(emptyFields => ({ ...emptyFields, password: true }));
    }
    if (password && email) {
      setEmptyFields({ email: false, password: false });
      const isEmailFormattedCorrectly = isEmailValid(email);

      if (!isEmailFormattedCorrectly) {
        setWrongCredentials(wrongCredentials => ({
          ...wrongCredentials,
          email: true
        }));
      } else {
        setWrongCredentials({ email: false, password: false });
        const data = {
          email,
          password
        };
        login(data)
          .then(function(response) {
            if (response.data.StatusCode == 200)
              setMessage(Dialogues.loginokerr);
          })
          .catch(function(error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              //console.log(error.response.data);
              //console.log(error.response.status);
              //console.log(error.response.headers);
              if (error.response.status == 403) {
                setMessage(Dialogues.loginfielderr);
              }
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              //console.log(error.request);
              setMessage(Dialogues.haveproblemerr);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
              setMessage(Dialogues.haveproblemerr);
            }
          });
      }
    }
  };

  return (
    <CSSTransitionGroup
      transitionName="loginForm"
      transitionEnterTimeout={600}
      transitionLeave={true}
      transitionLeaveTimeout={600}
      transitionAppearTimeout={600}
      transitionAppear={true}
    >
      <div className={styles.loginForm}>
        <form>
          <div>
            <label>
              {email && <span>{Dialogues.emailPlaceholder}</span>}
              <input
                className={`${(emptyFields.email || wrongCredentials.email) &&
                  styles.error}`}
                id="usernme"
                value={email}
                placeholder={Dialogues.emailPlaceholder}
                onChange={onEmailChange}
                type="email"
              ></input>

              {emptyFields.email ? (
                <p>{`${Dialogues.emailPlaceholder} نمی تواند خالی باشد`}</p>
              ) : (
                wrongCredentials.email && <p>{Dialogues.emailFormatError}</p>
              )}
            </label>
            <label>
              {password && <span>{Dialogues.passwordPlaceholder}</span>}
              <input
                className={`${(emptyFields.password ||
                  wrongCredentials.password) &&
                  styles.error}`}
                id="password"
                value={password}
                placeholder={Dialogues.passwordPlaceholder}
                onChange={onPasswordChange}
                type="password"
              ></input>

              {emptyFields.password ? (
                <p>{`${Dialogues.passwordPlaceholder} نمی تواند خالی باشد`}</p>
              ) : (
                wrongCredentials.password && (
                  <p>{`${Dialogues.passwordPlaceholder} اشتباه است`}</p>
                )
              )}
            </label>
          </div>
          <button type="submit" onClick={handleSubmit}>
            {Dialogues.submitbtn}
          </button>
          <p>{message}</p>
        </form>
        {/* <Link to="/">خانه</Link> */}
      </div>
    </CSSTransitionGroup>
  );
};
export default LoginForm;
