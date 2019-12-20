import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchMajors } from "Utils/ApiCalls/FetchList";
import { signup } from "Utils/ApiCalls/Auth";
import Select from "react-select";
import styles from "./SignupForm.module.scss";
import { Dialogues } from "Utils/Dialogues";

const SignupForm = props => {
  const [studentNumber, setStudentNumber] = useState()
  const [password, setPassword] = useState(undefined)
  const [passwordConfirm, setPasswordCongirm] = useState()
  const [majors, setMajors] = useState([]);
  const [major, setMajor] = useState();
  const [semester, setSemester] = useState();
  const [fullName, setFullName] = useState();
  const [error, setError] = useState(null);
  const [wrongCredentials, setWrongCredentials] = useState({
    password: false,
    passwordConfirm: false,
    fullName: false,
    semester: false,
    studentNumber: false,
    major: false
  });
  const [emptyFields, setEmptyFields] = useState({
    password: false,
    passwordConfirm: false,
    fullName: false,
    semester: false,
    studentNumber: false,
    major: false
  });

  /* change the empty fields whenever the inputs change */
  useEffect(() => {
    if (password) {
      setEmptyFieldToFalse("password");
    }
    if(passwordConfirm) {
      setEmptyFieldToFalse("passwordConfirm")
    }
    if (fullName) {
      setEmptyFieldToFalse("fullName");
    }
    if(studentNumber) {
      setEmptyFieldToFalse("studentNumber")
    }
    if (semester) {
      setEmptyFieldToFalse("semester");
    }
  }, [password, passwordConfirm, fullName, semester,studentNumber]);

  const toSelectForm = (majors) => {
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
        // console.log(response)
      })
      .catch(err => console.log('couldnt fetch'));
  }

  useEffect(() => {
    setMajorsInSelectSearch();
  }, []);

  const handlePasswordChange = e => {
    e.persist();
    const password = e.target.value;
    setError(null);
    setPassword(password);
  };
  const handlePasswordConfirmChange = e => {
    e.persist()
    const passwordConfirm = e.target.value
    setPasswordCongirm(passwordConfirm)
  }
  const handleSemesterChange = e => {
    e.persist();
    const term = e.target.value;
    if( !term || (term > 0 && term < 8)) {
      setSemester(term)
    }
  };

  const handleStudentNumberChange = e => {
    e.persist()
    const studentNumber = e.target.value
    setStudentNumber(studentNumber)
  }
  const handleFullNameChange = e => {
    e.persist();
    const name = e.target.value;
    setFullName(name);
  };
  const handleMajorChange = e => {
    const major = e.value;
    setMajor(major);
  };

  const setEmptyFieldToTrue = key => {
    /* we pass a callback to the setState to get the latest state */
    setEmptyFields(emptyFields => ({ ...emptyFields, [key]: true }))
  }

  const setWrongCredentialsToFalse = key => {
    setWrongCredentials(credentials => ({...credentials, [key]: false}))
  }

  const setWrongCredentialsToTrue = key => {
    setWrongCredentials(credentials => ({...credentials, [key]: true}))
  }

  const setEmptyFieldToFalse = key => {
    setEmptyFields(emptyFields => ({...emptyFields,[key]: false}))
  }
  const toSubmit = () => {
    signup({
      password,
      studentNumber,
      semester,
      major,
      full_name: fullName
    })
      .then(res => {
        let status = res.status;
        if (status === 200 || status === 201) {
          alert("done");
        }
      })
      .catch(err => {
        let status = err.status
        if (status === 409) {
          setError("حساب کاربری با این نام کاربری موجود است");
        } else if (status === 406) {
          setError("خطا در سرور ! لطفا بعدا اقدام کنید");
        } else if (status === 404 || status === 400) {
          setError("رشته وارد شده صحیح نمیباشد");
        }
      });
  }

  const onFormSubmit = e => {
    e.preventDefault();
    fullName ? setEmptyFieldToFalse('fullName') : setEmptyFieldToTrue('fullName')
    major ? setEmptyFieldToFalse('major') : setEmptyFieldToTrue('major')
    semester ? setEmptyFieldToFalse('semester') : setEmptyFieldToTrue('semester')
    password ? setEmptyFieldToFalse('password') : setEmptyFieldToTrue('password')
    studentNumber ? setEmptyFieldToFalse('studentNumber') : setEmptyFieldToTrue('studentNumber')
    password && password.length < 4 ? setWrongCredentialsToTrue('password') : setWrongCredentialsToFalse('password')
    password && !passwordConfirm ? setEmptyFieldToTrue('passwordConfirm') : setEmptyFieldToFalse('passwordConfirm')
    password && password !== passwordConfirm ? setWrongCredentialsToTrue('passwordConfirm') : setWrongCredentialsToFalse('passwordConfirm')
    studentNumber && isNaN(studentNumber) ? setWrongCredentialsToTrue('studentNumber') : setWrongCredentialsToFalse('studentNumber')
    let err
    if( isNaN(studentNumber) || password.length < 4 || password !== passwordConfirm){
       err = true
     }
    if (!err && (fullName && major && password && semester && studentNumber && passwordConfirm)) {
      console.log('submited')
      toSubmit()
    }else {
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
              className={`${(emptyFields.fullName ||
                wrongCredentials.fullName) &&
                styles.error}`}
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
            {studentNumber && <span>{Dialogues.studentNumberPlaceholder}</span>}
            <input
              className={`${(emptyFields.studentNumber ||
                wrongCredentials.studentNumber) &&
                styles.error}`}
              type="text"
              value={studentNumber}
              onChange={handleStudentNumberChange}
              placeholder={Dialogues.studentNumberPlaceholder}
            />
            {emptyFields.studentNumber ? (
              <p>{`${Dialogues.studentNumberPlaceholder} نمی تواند خالی باشد`}</p>
            ) : (
              wrongCredentials.studentNumber && (
                <p>{`${Dialogues.studentNumberPlaceholder} اشتباه است`}</p>
              )
            )}
          </label>



          <label>
            {password && <span>{Dialogues.passwordPlaceholder}</span>}
            <input
              className={`${(emptyFields.password ||
                wrongCredentials.password) &&
                styles.error}`}
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder={Dialogues.passwordPlaceholder}
            />
            {emptyFields.password ? (
              <p>{`${Dialogues.passwordPlaceholder} نمی تواند خالی باشد`}</p>
            ) : (
              wrongCredentials.password && (
                <p>{`${Dialogues.passwordPlaceholder} اشتباه است.بیشتر از 4 کاراکتر وارد کنید`}</p>
              )
            )}
          </label>

          <label>
            {passwordConfirm && <span>{Dialogues.passwordConfirmPlaceholder}</span>}
            <input
              className={`${(emptyFields.passwordConfirm ||
                wrongCredentials.passwordConfirm) &&
                styles.error}`}
              type="password"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
              placeholder={Dialogues.passwordConfirmPlaceholder}
            />
            {emptyFields.passwordConfirm ? (
              <p>{`${Dialogues.passwordConfirmPlaceholder} نمی تواند خالی باشد`}</p>
            ) : (
              wrongCredentials.passwordConfirm && (
                <p>{`${Dialogues.passwordConfirmPlaceholder} اشتباه است`}</p>
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
            {emptyFields.major ? (
              <p>{`${Dialogues.majorPlaceholder} نمی تواند خالی باشد`}</p>
            ) : (
              wrongCredentials.major && (
                <p>{`${Dialogues.majorPlaceholder} اشتباه است`}</p>
              )
            )}
          </label>
          <label>
            {semester && <span>{Dialogues.semesterPlaceholder}</span>}
            <input
              className={`${(emptyFields.semester ||
                wrongCredentials.semester) &&
                styles.error}`}
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
