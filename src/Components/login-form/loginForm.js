import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LoginForm.module.scss";
import { login } from "Utils/ApiCalls/Auth";
import { Dialogues } from "Utils/Dialogues";
const LoginForm = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = e => {
    e.persist();
    e.preventDefault();
    if (!username || !password) {
      setError(Dialogues.inputemptyerr);
    } else {
      const data = {
        username,
        password
      };
      login(data)
        .then(function(response) {
          if (response.data.StatusCode == 200) setError(Dialogues.loginokerr);
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            //console.log(error.response.data);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response.status == 403) {
              setError(Dialogues.loginfielderr);
            }
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            //console.log(error.request);
            setError(Dialogues.haveproblemerr);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
            setError(Dialogues.haveproblemerr);
          }
        });
    }
  };

  return (
    <div className={styles.loginForm}>
      <form>
        <fieldset>
          <input
            id="usernme"
            value={username}
            placeholder={Dialogues.usernameplc}
            onChange={e => {
              setUsername(e.target.value);
            }}
            type="email"
          ></input>
          <input
            id="password"
            value={password}
            placeholder={Dialogues.passwordplc}
            onChange={e => {
              setPassword(e.target.value);
            }}
            type="password"
          ></input>
        </fieldset>
        <button type="submit" onClick={handleSubmit}>
          {Dialogues.submitbtn}
        </button>
        <p>{error}</p>
      </form>
      <Link to="/">خانه</Link>
    </div>
  );
};
export default LoginForm;
