import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchMajors } from "Utils/ApiCalls/FetchList";
import { signup } from "Utils/ApiCalls/Auth";
import Select from "react-select";
import style from "./SignupForm.module.css";

const SignupForm = props => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [majors, setMajors] = useState([]);
  const [major, setMajor] = useState();
  const [semester, setSemester] = useState();
  const [fullName, setFullName] = useState();
  const [error, setError] = useState(null);

  const toSelectForm = majors => {
    const majorsCopy = [];
    majors.map(major => {
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
    if (password.length < 4) {
      setError("برای رمز عبور بیشتر از 4 کاراکتر وارد کنید");
    } else {
      setError(null);
    }
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

  const onFormSubmit = e => {
    e.preventDefault();
    if (!error) {
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
    <div>
      <form className={style.signupForm} onSubmit={onFormSubmit}>
        {error && <p className={style.error}>{error}</p>}
        <label>
          نام کاربری
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label>
          رمز عبور
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <label>
          ترم
          <input
            type="number"
            value={semester}
            onChange={handleSemesterChange}
          />
        </label>
        <label>
          رشته
          <Select
            className={style.selectSearch}
            placeholder="انتخاب کنید"
            options={toSelectForm(majors)}
            onChange={handleMajorChange}
          />
        </label>
        <label>
          نام و نام خانوادگی
          <input type="text" value={fullName} onChange={handleFullNameChange} />
        </label>
        <button type="submit">ثبت</button>
      </form>
      <Link to="/">خانه</Link>
    </div>
  );
};

export default SignupForm;
