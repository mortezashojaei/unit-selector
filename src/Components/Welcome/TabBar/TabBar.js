import React from "react";
import { Link } from "react-router-dom";
import styles from "./TabBar.module.scss";

const TabBar = () => {
  const { pathname } = window.location;
  return (
    <div>
      <nav className={styles.navLink}>
        <Link
          to="/login"
          className={`${styles.logIn} ${pathname === "/login" &&
            styles.active}`}
        >
          <div>
            <span> ورود </span>
            به سیستم
          </div>
          {/* <embed src="./assets/images/loginicon.svg" alt="ورود" /> */}
          <i className="icon ion-md-log-in"></i>
        </Link>
        <Link
          to="/signup"
          className={`${styles.signUp} ${pathname === "/signup" &&
            styles.active}`}
        >
          {/* <embed src="./assets/images/registericon.svg" alt="ثبت نام" /> */}
          <i className="icon ion-md-person-add"></i>

          <div>
            یا
            <span> ثبت نام </span>
            کنید !
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default TabBar;
