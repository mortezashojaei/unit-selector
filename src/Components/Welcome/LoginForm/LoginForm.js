import React, { useState, useEffect, useCallback } from "react";

import { CSSTransitionGroup } from "react-transition-group";

import { useAuth } from "Utils/Authentication/Auth";
import styles from "./LoginForm.module.scss";
import { login as loginApiCall } from "Utils/ApiCalls/Auth";
import { Dialogues } from "Utils/Dialogues";
import { isEmailValid } from "Utils/formValidators";
import "./LoginFormAnimations.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [wrongCredentials, setWrongCredentials] = useState({
    email: false,
    password: false,
  });
  const [emptyFields, setEmptyFields] = useState({
    email: false,
    password: false,
  });

  const { login } = useAuth();

  /*  with usecallback hook react remembers this function between rerenders,
  and avoids creating a new function every time the compoenent rerenders,
  therefore the rerendering of the child components are avoided */
  const onEmailChange = useCallback((e) => {
    setEmail(e.target.value);
    setWrongCredentials((wrongCredentials) => ({
      ...wrongCredentials,
      email: false,
    }));
  }, []);

  const onPasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  /* change the empty fields whenever the inputs change */
  useEffect(() => {
    if (email) {
      setEmptyFields((emptyFields) => ({
        ...emptyFields,
        email: false,
      }));
    }
    if (password) {
      setEmptyFields((emptyFields) => ({
        ...emptyFields,
        password: false,
      }));
    }
  }, [email, password]);

  const handleSubmit = (e) => {
    e.persist();
    e.preventDefault();
    if (!email) {
      setEmptyFields((emptyFields) => ({ ...emptyFields, email: true }));
    }
    if (!password) {
      setEmptyFields((emptyFields) => ({ ...emptyFields, password: true }));
    }
    if (password && email) {
      setEmptyFields({ email: false, password: false });
      const isEmailFormattedCorrectly = isEmailValid(email);

      if (!isEmailFormattedCorrectly) {
        setWrongCredentials((wrongCredentials) => ({
          ...wrongCredentials,
          email: true,
        }));
      } else {
        setWrongCredentials({ email: false, password: false });
        const data = {
          email,
          password,
        };
        loginApiCall(data)
          .then(function (response) {
            if (response.data.StatusCode === 200) {
              login(response.data.data.token);
            }
          })
          .catch(function (error) {
            if (error.response) {
              if (error.StatusCode === 403) {
                setMessage(Dialogues.loginfielderr);
                Swal.fire({
                  icon: "error",
                  title: Dialogues.error,
                  text: Dialogues.wrongUsernameOrPassword,
                });
              }
            } else if (error.request) {
              Swal.fire({
                icon: "error",
                title: Dialogues.error,
                text: Dialogues.wrongUsernameOrPassword,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: Dialogues.error,
                text: Dialogues.wrongUsernameOrPassword,
              });
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
                className={`${
                  (emptyFields.email || wrongCredentials.email) && styles.error
                }`}
                id="usernme"
                value={email}
                placeholder={Dialogues.emailPlaceholder}
                onChange={onEmailChange}
                type="email"
              ></input>

              {emptyFields.email ? (
                <p>{`${Dialogues.emailPlaceholder} ${Dialogues.cantBeEmpty}`}</p>
              ) : (
                wrongCredentials.email && <p>{Dialogues.emailFormatError}</p>
              )}
            </label>
            <label>
              {password && <span>{Dialogues.passwordPlaceholder}</span>}
              <input
                className={`${
                  (emptyFields.password || wrongCredentials.password) &&
                  styles.error
                }`}
                id="password"
                value={password}
                placeholder={Dialogues.passwordPlaceholder}
                onChange={onPasswordChange}
                type="password"
              ></input>

              {emptyFields.password ? (
                <p>{`${Dialogues.passwordPlaceholder} ${Dialogues.cantBeEmpty}`}</p>
              ) : (
                wrongCredentials.password && (
                  <p>{`${Dialogues.passwordPlaceholder} ${Dialogues.isWrong}`}</p>
                )
              )}
            </label>
          </div>
          <button type="submit" onClick={handleSubmit}>
            {Dialogues.submitbtn}
          </button>
          <p>{message}</p>
        </form>
      </div>
    </CSSTransitionGroup>
  );
};
export default LoginForm;
