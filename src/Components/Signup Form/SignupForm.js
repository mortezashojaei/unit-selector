import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchMajors } from "Utils/ApiCalls/FetchList";
import { signup } from "Utils/ApiCalls/Auth";
import Select from "react-select";
import styles from "./SignupForm.module.scss";
import { Dialogues } from "Utils/Dialogues";

const SignupForm = props => {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [majors, setMajors] = useState([]);
  const [major, setMajor] = useState();
  const [semester, setSemester] = useState();
  const [fullName, setFullName] = useState();
  const [error, setError] = useState(null);
  const [wrongCredentials, setWrongCredentials] = useState({
    email: false,
    password: false,
    fullName: false,
    semester: false
  });
  const [emptyFields, setEmptyFields] = useState({
    email: false,
    password: false,
    fullName: false,
    semester: false
  });

  /* change the empty fields whenever the inputs change */
  useEffect(() => {
    if (email) {
      setEmptyFieldToFalse("email");
    }
    if (password) {
      setEmptyFieldToFalse("password");
    }
    if (fullName) {
      setEmptyFieldToFalse("fullName");
    }
    if (semester) {
      setEmptyFieldToFalse("semester");
    }
  }, [email, password, fullName, semester]);

  const toSelectForm = majors => {
    const majorsCopy = [];
    majors.forEach(major => {
      console.log(majorsCopy);
      return majorsCopy.push({ label: major.name, value: major.id });
    });
    return majorsCopy;
  };
  function setMajorsInSelectSearch() {
    fetchMajors()
      .then(response => {
        setMajors(response.data);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    setMajorsInSelectSearch();
  }, []);

  const handleUsernameChange = e => {
    e.persist();
    const username = e.target.value;
    if (username.length < 2) {
      setError(" برای نام کاربری بیشتر از 5 کاراکتر وارد کنید");
    } else {
      setError(null);
    }
    setUsername(username);
  };
  const handlePasswordChange = e => {
    e.persist();
    const password = e.target.value;
    setError(null);
    setPassword(password);
  };
  const handleSemesterChange = e => {
    e.persist();
    const term = e.target.value;
    if (term < 0 || term > 12) {
      setError("شماره ترم را اصلاح کنید");
    } else {
      setError(null);
    }
    setSemester(term);
  };
  const handleFullNameChange = e => {
    e.persist();
    const name = e.target.value;
    setFullName(name);
  };
  const handleMajorChange = e => {
    const major = e.value;
    setMajor(major);
    console.log(e);
  };

  const setEmptyFieldToTrue = key => {
    /* we pass a callback to the setState to get the latest state */
    setEmptyFields(emptyFields => ({ ...emptyFields, [key]: true }));
  };

  const setEmptyFieldToFalse = key => {
    setEmptyFields(emptyFields => ({
      ...emptyFields,
      [key]: false
    }));
  };

  const onFormSubmit = e => {
    e.preventDefault();
    if (!semester) {
      setEmptyFieldToTrue("semester");
    }
    if (!fullName) {
      setEmptyFieldToTrue("fullName");
    }
    if (!password) {
      setEmptyFieldToTrue("password");
    } else if (password.length < 4) {
      setError("برای رمز عبور بیشتر از 4 کاراکتر وارد کنید");
    } else {
      setError(null);
    }
    if (!error && semester && fullName && password) {
      signup({
        username,
        password,
        semester,
        major,
        full_name: fullName
      })
        .then(res => {
          let status = res.status;
          if (status === 200 || status === 201) {
            alert("done");
          } else if (status === 409) {
            setError("حساب کاربری با این نام کاربری موجود است");
          } else if (status === 406) {
            setError("خطا در سرور ! لطفا بعدا اقدام کنید");
          } else if (status === 404 || status === 400) {
            setError("رشته وارد شده صحیح نمیباشد");
          }
        })
        .catch(err => console.log(err));
    } else {
      alert("error");
    }
  };

  return (
    <div className={styles.signupForm}>
      <form onSubmit={onFormSubmit}>
        <div>
          {error && <p className={styles.error}>{error}</p>}
          <label>
            {fullName && <span>{Dialogues.fullnamePlaceholder}</span>}
            <input
              className={
                (emptyFields.fullName || wrongCredentials.fullName) &&
                styles.error
              }
              type="text"
              value={fullName}
              onChange={handleFullNameChange}
              placeholder={Dialogues.fullnamePlaceholder}
            />
            {emptyFields.fullName ? (
              <p>{`${Dialogues.fullnamePlaceholder} نمی تواند خالی باشد`}</p>
            ) : (
              wrongCredentials.fullName && (
                <p>{`${Dialogues.fullnamePlaceholder} اشتباه است`}</p>
              )
            )}
          </label>

          <label>
            {password && <span>{Dialogues.passwordPlaceholder}</span>}
            <input
              className={
                (emptyFields.password || wrongCredentials.password) &&
                styles.error
              }
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder={Dialogues.passwordPlaceholder}
            />
            {emptyFields.password ? (
              <p>{`${Dialogues.passwordPlaceholder} نمی تواند خالی باشد`}</p>
            ) : (
              wrongCredentials.password && (
                <p>{`${Dialogues.passwordPlaceholder} اشتباه است`}</p>
              )
            )}
          </label>
          <label>
            {major && <span>{Dialogues.majorPlaceholder}</span>}
            <Select
              className={styles.selectSearch}
              options={toSelectForm(majors)}
              onChange={handleMajorChange}
              placeholder={Dialogues.majorPlaceholder}
            />
          </label>
          <label>
            {semester && <span>{Dialogues.semesterPlaceholder}</span>}
            <input
              className={
                (emptyFields.semester || wrongCredentials.semester) &&
                styles.error
              }
              type="number"
              value={semester}
              onChange={handleSemesterChange}
              placeholder={Dialogues.semesterPlaceholder}
            />
            {emptyFields.semester ? (
              <p>{`${Dialogues.semesterPlaceholder} نمی تواند خالی باشد`}</p>
            ) : (
              wrongCredentials.semester && (
                <p>{`${Dialogues.semesterPlaceholder} اشتباه است`}</p>
              )
            )}
          </label>
          {/* looks like we don't need this field right now */}
          {/* <label>
            نام کاربری
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder={Dialogues.passwordPlaceholder}

            />
          </label> */}
        </div>
        <button type="submit">تکمیل عضویت</button>
      </form>
      <Link to="/">خانه</Link>
    </div>
  );
};

export default SignupForm;
