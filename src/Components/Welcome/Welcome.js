import React from "react";
import { Link } from "react-router-dom";

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
  </main>
);

export default Welcome;
