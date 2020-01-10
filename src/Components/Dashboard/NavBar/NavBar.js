import React, { useCallback, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import styles from "./NavBar.module.scss";

const NavBar = ({ history }) => {
  const [isMenuClosed, setIsMenuClosed] = useState(true);

  const logout = useCallback(() => {
    history.push("/");
  }, [history]);

  const toggleMenu = useCallback(() => {
    setIsMenuClosed(isMenuClosed => !isMenuClosed);
  }, []);

  return (
    <nav className={`${styles.navBar} `}>
      <div className={styles.logo}>لوگو</div>
      <div className={styles.buttonContainer}>
        <button onClick={logout}>
          خروج <span className={styles.circle}></span>
        </button>
        <button
          onClick={() => {
            alert("blah blah blah");
          }}
        >
          ویرایش اطلاعات <span className={styles.circle}></span>
        </button>
      </div>
      <div
        className={`${styles.linkContainer} ${
          isMenuClosed ? styles.closed : styles.open
        }`}
      >
        <Link to="#">لینک اول منو</Link>
        <Link to="#">لینک دوم منو</Link>
        <Link to="#">لینک سوم منو</Link>
        <Link to="#">لینک چهارم منو</Link>
      </div>
      <button className={styles.toggleButton} onClick={toggleMenu}>
        <i className={`icon ion-md-${isMenuClosed ? "menu" : "close"}`}></i>
      </button>
    </nav>
  );
};

export default withRouter(NavBar);
