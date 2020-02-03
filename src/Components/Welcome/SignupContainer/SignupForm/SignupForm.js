import React, { useState, useRef, useEffect, useCallback } from "react";
import { login as login } from "Utils/ApiCalls/Auth";

import Select from "react-select";
// import SelectSearch from "react-select-search";
import { CSSTransitionGroup } from "react-transition-group";

import SelectSearch from "Components/SelectSearch/SelectSearch";
import { fetchMajors } from "Utils/ApiCalls/FetchList";
import { signup } from "Utils/ApiCalls/Auth";
import { Dialogues } from "Utils/Dialogues";
import majorList from "Utils/majorFakeData";
import styles from "./SignupForm.module.scss";
import { useAuth } from "Utils/Authentication/Auth";
import "./reactSelect.scss";

const SignupForm = props => {
  const selectRef = useRef(null);
  const { login } = useAuth();
  const onSelectFocus = () => {
    selectRef.current.size = 10;
  };
  const onSelectBlur = () => {
    selectRef.current.size = 1;
  };

  const { isEdit } = props;
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordCongirm] = useState("");
  const [majors, setMajors] = useState(null);
  const [major, setMajor] = useState("");
  const [semester, setSemester] = useState("");
  const [fullName, setFullName] = useState("");
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
  useEffect(()=>{
    setStudentNumber(props.student_number)
    setSemester(props.semester)
    setMajor(props.major)
    setFullName(props.full_name)
    
  },[props.email])

  /* change the empty fields whenever the inputs change */
  useEffect(() => {
    if (password || isEdit) {
      setEmptyFieldToFalse("password");
    }
    if (passwordConfirm || isEdit) {
      setEmptyFieldToFalse("passwordConfirm");
    }
    if (fullName) {
      setEmptyFieldToFalse("fullName");
    }
    if (studentNumber) {
      setEmptyFieldToFalse("studentNumber");
    }
    if (semester) {
      setEmptyFieldToFalse("semester");
    }
  }, [password, passwordConfirm, fullName, semester, studentNumber]);

  const toSelectForm = majors => {
    const majorsCopy = [];
    majors.forEach(major => {
      console.log(majorsCopy);
      return majorsCopy.push({
        name: major.persianName,
        value: major.id
      });
    });
    return majorsCopy;
  };
  function setMajorsInSelectSearch() {
    fetchMajors()
      .then(response => {
        // console.log("majors", response.data.data);
        setMajors(response.data.data);
        // console.log(response)
      })
      .catch(err => console.log("couldnt fetch"));
  }

  useEffect(() => {
    setMajorsInSelectSearch();
  }, []);

  const handlePasswordChange = useCallback(e => {
    e.persist();
    const password = e.target.value;
    setError(null);
    setPassword(password);
  }, []);
  const handlePasswordConfirmChange = useCallback(e => {
    e.persist();
    const passwordConfirm = e.target.value;
    setPasswordCongirm(passwordConfirm);
  }, []);
  const handleSemesterChange = useCallback(e => {
    e.persist();
    const term = e.target.value;
    if (!term || (term > 0 && term <= 8)) {
      setSemester(term);
    }
  }, []);

  const handleStudentNumberChange = useCallback(e => {
    e.persist();
    const studentNumber = e.target.value;
    setStudentNumber(studentNumber);
  }, []);
  const handleFullNameChange = useCallback(e => {
    e.persist();
    const name = e.target.value;
    setFullName(name);
  }, []);
  // const handleMajorChange = useCallback(e => {
  //   const major = e.target.value !== 0 ? e.target.value : e.target.innerHTML;

  //   setMajor(major);
  // }, []);
  const handleMajorChange = useCallback(e => {
    setMajor(e.target.value);
    // console.log(major)
    selectRef.current.size = 1;
  });

  const setEmptyFieldToTrue = key => {
    /* we pass a callback to the setState to get the latest state */
    setEmptyFields(emptyFields => ({ ...emptyFields, [key]: true }));
  };

  const setWrongCredentialsToFalse = key => {
    setWrongCredentials(credentials => ({ ...credentials, [key]: false }));
  };

  const setWrongCredentialsToTrue = key => {
    setWrongCredentials(credentials => ({ ...credentials, [key]: true }));
  };

  const setEmptyFieldToFalse = key => {
    setEmptyFields(emptyFields => ({ ...emptyFields, [key]: false }));
  };
  const toSubmit = () => {
    let type = "post";
    if (isEdit === true) type = "put";
    signup(
      {
        password,
        student_number: studentNumber,
        semester,
        major_id: major,
        full_name: fullName,
        email: props.email
      },
      type
    )
      .then(res => {
        let status = res.status;
        if (status === 200 || status === 201) {
          login(res.data.data.token);
        }
      })
      .catch(err => {
        let status = err.status;
        if (status === 409) {
          setError("حساب کاربری با این نام کاربری موجود است");
        } else if (status === 406) {
          setError("خطا در سرور ! لطفا بعدا اقدام کنید");
        } else if (status === 404 || status === 400) {
          setError("رشته وارد شده صحیح نمیباشد");
        }
      });
  };

  const onFormSubmit = e => {
    e.preventDefault();
    fullName
      ? setEmptyFieldToFalse("fullName")
      : setEmptyFieldToTrue("fullName");
    major ? setEmptyFieldToFalse("major") : setEmptyFieldToTrue("major");
    semester
      ? setEmptyFieldToFalse("semester")
      : setEmptyFieldToTrue("semester");
    password
      ? setEmptyFieldToFalse("password")
      : setEmptyFieldToTrue("password");
    studentNumber
      ? setEmptyFieldToFalse("studentNumber")
      : setEmptyFieldToTrue("studentNumber");
    password && password.length < 4
      ? setWrongCredentialsToTrue("password")
      : setWrongCredentialsToFalse("password");
    password && !passwordConfirm
      ? setEmptyFieldToTrue("passwordConfirm")
      : setEmptyFieldToFalse("passwordConfirm");
    password && password !== passwordConfirm
      ? setWrongCredentialsToTrue("passwordConfirm")
      : setWrongCredentialsToFalse("passwordConfirm");
    studentNumber && isNaN(studentNumber)
      ? setWrongCredentialsToTrue("studentNumber")
      : setWrongCredentialsToFalse("studentNumber");
    let err;
    if (
      isNaN(studentNumber) ||
      password.length < 4 ||
      (password !== passwordConfirm && !isEdit)
    ) {
      err = true;
    }
    if (
      !err &&
      fullName &&
      major &&
      ((password && passwordConfirm) || isEdit) &&
      semester &&
      studentNumber
    ) {
      console.log("submited");
      toSubmit();
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
              type="number"
              value={studentNumber}
              onChange={handleStudentNumberChange}
              placeholder={Dialogues.studentNumberPlaceholder}
              readOnly={isEdit ? "true" : ""}
            />
            {emptyFields.studentNumber ? (
              <p>{`${Dialogues.studentNumberPlaceholder} نمی تواند خالی باشد`}</p>
            ) : (
              wrongCredentials.studentNumber && (
                <p>{`${Dialogues.studentNumberPlaceholder} اشتباه است`}</p>
              )
            )}
          </label>
          {isEdit ? (
            ""
          ) : (
            <React.Fragment>
              <label style={{ order: isEdit ? 3 : "" }}>
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

              <label style={{ order: isEdit ? 4 : "" }}>
                {passwordConfirm && (
                  <span>{Dialogues.passwordConfirmPlaceholder}</span>
                )}
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
            </React.Fragment>
          )}

          <label>
            {major && <span>{Dialogues.majorPlaceholder}</span>}
            {/* <Select
              className={"majorSelectSearch"}
              classNamePrefix={"majorSelectSearch"}
              options={toSelectForm(majors)}
              onChange={handleMajorChange}
              placeholder={Dialogues.majorPlaceholder}
            /> */}
            {/* <SelectSearch
              className={"majorSelectSearch"}
              options={toSelectForm(majors)}
              placeholder={Dialogues.majorPlaceholder}
              onChange={handleMajorChange}
            /> */}
            {/* <SelectSearch
              value={major}
              options={toSelectForm(majors)}
              onChange={handleMajorChange}
              placeholder={Dialogues.majorPlaceholder}
            /> */}
            <select
              ref={selectRef}
              onFocus={onSelectFocus}
              onBlur={onSelectBlur}
              onChange={handleMajorChange}
            >
              {majors &&
                majors.map(major => (
                  <option key={major.id} value={major.id}>
                    {major.name}
                  </option>
                ))}
            </select>

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
        </div>
        <button type="submit">
          {isEdit ? Dialogues.editSubmit : Dialogues.registerSubmit2}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
