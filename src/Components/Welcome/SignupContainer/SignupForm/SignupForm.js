import React, { useState, useEffect, useCallback } from "react";

import { fetchMajors } from "Utils/ApiCalls/FetchList";
import { signup } from "Utils/ApiCalls/Auth";
import { Dialogues } from "Utils/Dialogues";
import styles from "./SignupForm.module.scss";
import { useAuth } from "Utils/Authentication/Auth";
import "./reactSelect.scss";
import AlefSelectSearch from "Components/SelectSearch/AlefSelectSearch";

const SignupForm = (props) => {
  // const selectRef = useRef(null);
  const { login } = useAuth();
  // const onSelectFocus = () => {
  //   selectRef.current.size = 10;
  // };
  // const onSelectBlur = () => {
  //   selectRef.current.size = 1;
  // };

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
    major: false,
  });
  const [emptyFields, setEmptyFields] = useState({
    password: false,
    passwordConfirm: false,
    fullName: false,
    semester: false,
    studentNumber: false,
    major: false,
  });
  useEffect(() => {
    setStudentNumber(props.student_number);
    setSemester(props.semester);
    console.log('major= '+props.major)
    if (majors)
      for (var i = 0; i < majors.length; i++) {
        if (majors[i]["name"] === props.major) {
          setMajor(majors[i]["id"]);
          console.log(majors[i]["id"]);
        }
      }
    setFullName(props.full_name);
  }, [
    props.email,
    majors,
    props.major,
    props.semester,
    props.full_name,
    props.student_number,
  ]);

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
  }, [password, passwordConfirm, fullName, semester, isEdit, studentNumber]);

  function setMajorsInSelectSearch() {
    fetchMajors()
      .then((response) => {
        // console.log("majors", response.data.data);
        setMajors(response.data.data);
        // console.log(response)
      })
      .catch((err) => console.log("couldn't fetch"));
  }

  useEffect(() => {
    setMajorsInSelectSearch();
  }, []);

  const handlePasswordChange = useCallback((e) => {
    e.persist();
    const password = e.target.value;
    setError(null);
    setPassword(password);
  }, []);
  const handlePasswordConfirmChange = useCallback((e) => {
    e.persist();
    const passwordConfirm = e.target.value;
    setPasswordCongirm(passwordConfirm);
  }, []);
  const handleSemesterChange = useCallback((e) => {
    e.persist();
    const term = e.target.value;
    if (!term || (term > 0 && term <= 8)) {
      setSemester(term);
    }
  }, []);

  const handleStudentNumberChange = useCallback((e) => {
    e.persist();
    const studentNumber = e.target.value;
    setStudentNumber(studentNumber);
  }, []);
  const handleFullNameChange = useCallback((e) => {
    e.persist();
    const name = e.target.value;
    setFullName(name);
  }, []);
  // const handleMajorChange = useCallback(e => {
  //   const major = e.target.value !== 0 ? e.target.value : e.target.innerHTML;

  //   setMajor(major);
  // }, []);
  const handleMajorChange = useCallback(
    (e) => {
      setMajor(e.target.value);
      console.log(major);
      //   selectRef.current.size = 1;
    },
    [major]
  );

  const setEmptyFieldToTrue = (key) => {
    /* we pass a callback to the setState to get the latest state */
    setEmptyFields((emptyFields) => ({ ...emptyFields, [key]: true }));
  };

  const setWrongCredentialsToFalse = (key) => {
    setWrongCredentials((credentials) => ({ ...credentials, [key]: false }));
  };

  const setWrongCredentialsToTrue = (key) => {
    setWrongCredentials((credentials) => ({ ...credentials, [key]: true }));
  };

  const setEmptyFieldToFalse = (key) => {
    setEmptyFields((emptyFields) => ({ ...emptyFields, [key]: false }));
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
        email: props.email,
      },
      type
    )
      .then((res) => {
        let status = res.status;
        if (status === 200 || status === 201) {
          login(res.data.data.token, isEdit);
        }
      })
      .catch((err) => {
        let status = err.status;
        if (status === 409) {
          setError(Dialogues.userWithThisUsernameAlreadyExists);
        } else if (status === 406) {
          setError(Dialogues.serverError);
        } else if (status === 404 || status === 400) {
          setError(Dialogues.wrongMajor);
        }
      });
  };

  const onFormSubmit = (e) => {
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
      ((password.length < 4 || password !== passwordConfirm) && !isEdit)
    ) {
      console.log(1);
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
              className={`${
                (emptyFields.fullName || wrongCredentials.fullName) &&
                styles.error
              }`}
              type="text"
              value={fullName}
              onChange={handleFullNameChange}
              placeholder={Dialogues.fullnamePlaceholder}
            />
            {emptyFields.fullName ? (
              <p>{`${Dialogues.fullnamePlaceholder} ${Dialogues.cantBeEmpty}`}</p>
            ) : (
              wrongCredentials.fullName && (
                <p>{`${Dialogues.fullnamePlaceholder} ${Dialogues.isWrong}`}</p>
              )
            )}
          </label>

          <label>
            {studentNumber && <span>{Dialogues.studentNumberPlaceholder}</span>}
            <input
              className={`${
                (emptyFields.studentNumber || wrongCredentials.studentNumber) &&
                styles.error
              }`}
              type="number"
              value={studentNumber}
              onChange={handleStudentNumberChange}
              placeholder={Dialogues.studentNumberPlaceholder}
              readOnly={isEdit ? "true" : ""}
            />
            {emptyFields.studentNumber ? (
              <p>{`${Dialogues.studentNumberPlaceholder} ${Dialogues.cantBeEmpty}`}</p>
            ) : (
              wrongCredentials.studentNumber && (
                <p>{`${Dialogues.studentNumberPlaceholder} ${Dialogues.isWrong}`}</p>
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
                  className={`${
                    (emptyFields.password || wrongCredentials.password) &&
                    styles.error
                  }`}
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder={Dialogues.passwordPlaceholder}
                />
                {emptyFields.password ? (
                  <p>{`${Dialogues.passwordPlaceholder} ${Dialogues.cantBeEmpty}`}</p>
                ) : (
                  wrongCredentials.password && (
                    <p>{`${Dialogues.passwordPlaceholder} ${Dialogues.shouldBeMoreThanFourCharacters}`}</p>
                  )
                )}
              </label>

              <label style={{ order: isEdit ? 4 : "" }}>
                {passwordConfirm && (
                  <span>{Dialogues.passwordConfirmPlaceholder}</span>
                )}
                <input
                  className={`${
                    (emptyFields.passwordConfirm ||
                      wrongCredentials.passwordConfirm) &&
                    styles.error
                  }`}
                  type="password"
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                  placeholder={Dialogues.passwordConfirmPlaceholder}
                />
                {emptyFields.passwordConfirm ? (
                  <p>{`${Dialogues.passwordConfirmPlaceholder} ${Dialogues.cantBeEmpty}`}</p>
                ) : (
                  wrongCredentials.passwordConfirm && (
                    <p>{`${Dialogues.passwordConfirmPlaceholder} ${Dialogues.isWrong}`}</p>
                  )
                )}
              </label>
            </React.Fragment>
          )}

          <label className="o-v">
            {majors && <span>{Dialogues.majorPlaceholder}</span>}

            {majors && (
              <AlefSelectSearch
                placeholder={Dialogues.majorPlaceholder}
                items={majors}
                onChange={handleMajorChange}
                value={major}
              />
            )}

            {emptyFields.major ? (
              <p>{`${Dialogues.majorPlaceholder} ${Dialogues.cantBeEmpty}`}</p>
            ) : (
              wrongCredentials.major && (
                <p>{`${Dialogues.majorPlaceholder} ${Dialogues.isWrong}`}</p>
              )
            )}
          </label>
          <label>
            {semester && <span>{Dialogues.semesterPlaceholder}</span>}
            <input
              className={`${
                (emptyFields.semester || wrongCredentials.semester) &&
                styles.error
              }`}
              type="number"
              value={semester}
              onChange={handleSemesterChange}
              placeholder={Dialogues.semesterPlaceholder}
            />
            {emptyFields.semester ? (
              <p>{`${Dialogues.semesterPlaceholder} ${Dialogues.cantBeEmpty}`}</p>
            ) : (
              wrongCredentials.semester && (
                <p>{`${Dialogues.semesterPlaceholder} ${Dialogues.isWrong}`}</p>
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
