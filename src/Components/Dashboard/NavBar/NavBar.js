import React, { useCallback, useState, useEffect } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { CSSTransitionGroup } from "react-transition-group";
import styles from "./NavBar.module.scss";
import "./NavBarAnimations.scss";

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
        <button onClick={() => alert("blah blah blah")}>
          ویرایش اطلاعات <span className={styles.circle}></span>
        </button>
      </div>
      <CSSTransitionGroup
        transitionName="navBar"
        transitionEnterTimeout={600}
        transitionLeave={true}
        transitionLeaveTimeout={600}
        transitionAppearTimeout={600}
        transitionAppear={true}
      >
        {!isMenuClosed && (
          <div className={styles.linkContainer}>
            <Link to="#">لینک اول منو</Link>
            <Link to="#">لینک دوم منو</Link>
            <Link to="#">لینک سوم منو</Link>
            <Link to="#">لینک چهارم منو</Link>
          </div>
        )}
      </CSSTransitionGroup>
      {/* show this one on larger screens only */}
      <div className={`${styles.linkContainer} ${styles.largeScreens}`}>
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
