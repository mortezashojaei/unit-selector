import React, { useCallback, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import styles from "./NavBar.module.scss";
import Gravatar from 'react-gravatar'

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
      <div className={styles.logo}><img src={process.env.PUBLIC_URL + '/assets/images/logo2.png'}></img></div>
      
      <div className={styles.buttonContainer}>
      <Gravatar email="sooltaniyan@gmail.com" />
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
        className={`${styles.linkContainer} ${styles.pageTitle} ${
          isMenuClosed ? styles.closed : styles.open
        }`}
      >
        <h1>
          تایتل این پست
        </h1>
        {/*
        <Link to="#">لینک اول منو</Link>
        <Link to="#">لینک دوم منو</Link>
        <Link to="#">لینک سوم منو</Link>
        <Link to="#">لینک چهارم منو</Link>
        */}
      </div>
      <button className={styles.toggleButton} onClick={toggleMenu}>
        <i className={`icon ion-md-${isMenuClosed ? "menu" : "close"}`}></i>
      </button>
      
    </nav>
  );
};

export default withRouter(NavBar);
