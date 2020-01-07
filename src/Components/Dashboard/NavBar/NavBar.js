import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <div className={styles.logo}>لوگو</div>
      <div className={styles.buttonContainer}>
        <button>خروج</button>
        <button>ویرایش اطلاعات</button>
      </div>
      <div className={styles.linkContainer}>
        <Link to="#">لینک اول منو</Link>
        <Link to="#">لینک دوم منو</Link>
        <Link to="#">لینک سوم منو</Link>
        <Link to="#">لینک چهارم منو</Link>
      </div>
    </nav>
  );
};

export default NavBar;
