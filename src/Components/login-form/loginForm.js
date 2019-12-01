import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./LoginForm.module.scss";
import { login } from "Utils/ApiCalls/Auth";
import { Dialogues } from "Utils/Dialogues";
const LoginForm = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [wrongInputs, setWrongInputs] = useState({
    email: false,
    password: false
  });

  useEffect(() => {
    if (email) {
      setWrongInputs(wrongInputs => ({ ...wrongInputs, email: false }));
    }
    if (password) {
      setWrongInputs(wrongInputs => ({ ...wrongInputs, password: false }));
    }
  }, [email, password]);

  const handleSubmit = e => {
    e.persist();
    e.preventDefault();
    if (!email && password) {
      setWrongInputs({ ...wrongInputs, email: true });
    } else if (!password && email) {
      setWrongInputs({ ...wrongInputs, password: true });
    } else if (!password && !email) {
      setWrongInputs({ email: true, password: true });
    } else {
      setWrongInputs({ email: false, password: false });
      const data = {
        email,
        password
      };
      login(data)
        .then(function(response) {
          if (response.data.StatusCode == 200) setMessage(Dialogues.loginokerr);
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
  };

  return (
    <div className={styles.loginForm}>
      <form>
        <div>
          <label>
            {email && <span>{Dialogues.emailPlaceholder}</span>}
            <input
              className={wrongInputs.email && styles.error}
              id="usernme"
              value={email}
              placeholder={Dialogues.emailPlaceholder}
              onChange={e => {
                setEmail(e.target.value);
              }}
              type="email"
            ></input>
            {wrongInputs.email && (
              <p
                className={styles.wrongInputs}
              >{`${Dialogues.emailPlaceholder} اشتباه است`}</p>
            )}
          </label>
          <label>
            {password && <span>{Dialogues.passwordPlaceholder}</span>}
            <input
              className={wrongInputs.password && styles.error}
              id="password"
              value={password}
              placeholder={Dialogues.passwordPlaceholder}
              onChange={e => {
                setPassword(e.target.value);
              }}
              type="password"
            ></input>
            {wrongInputs.password && (
              <p
                className={styles.wrongInputs}
              >{`${Dialogues.passwordPlaceholder} اشتباه است`}</p>
            )}
          </label>
        </div>
        <button type="submit" onClick={handleSubmit}>
          {Dialogues.submitbtn}
        </button>
        <p>{message}</p>
      </form>
      <Link to="/">خانه</Link>
    </div>
  );
};
export default LoginForm;
