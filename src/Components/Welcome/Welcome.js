import React from "react";
import { Link, Route } from "react-router-dom";
import SignupForm from "../Signup Form/SignupForm";
import LoginForm from "../login-form/LoginForm";
import styles from "./Welcome.module.scss";

const Welcome = () => (
  <main className={`${styles.welcome} container`}>
    <figure>
      <img src="./assets/images/khuLogo-black.png" alt="دانشگاه خوارزمی" />
      <figcaption>
        <h1>سیستم شبیه ساز انتخاب واحد</h1>
        برای دانشجویان : دانشگاه خوارزمی
      </figcaption>
    </figure>
    {/* show the navigation buttons if we're on the home route */}
    {window.location.pathname === "/" && (
      <nav className={styles.navLink}>
        <Link to="/login" className={styles.logIn}>
          <div>
            <span> ورود </span>
            به سیستم
          </div>
          <embed src="./assets/images/loginicon.svg" alt="ورود" />
        </Link>
        <Link to="/signup" className={styles.signUp}>
          <embed src="./assets/images/registericon.svg" alt="ثبت نام" />
          <div>
            یا
            <span> ثبت نام </span>
            کنید !
          </div>
        </Link>
      </nav>
    )}
    <Route path="/signup" exact component={SignupForm} />
    <Route path="/login" exact component={LoginForm} />
  </main>
);

export default Welcome;
