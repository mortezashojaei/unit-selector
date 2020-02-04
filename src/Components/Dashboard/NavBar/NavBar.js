import React, { useCallback, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import styles from "./NavBar.module.scss";
import Gravatar from "react-gravatar";
import { useAuth } from "Utils/Authentication/Auth";
import { info } from "Utils/ApiCalls/Auth";


const NavBar = ({ history }) => {
  const [data,setData] = useState(localStorage.getItem('email'));
  useEffect(() => {
    info().then(function(response) {
     if(response.data) setData(response.data.data.email);
     localStorage.setItem('email',response.data.data.email)
  })
},[]);
const [toogleProfile,setToogleProfile] = useState(true)
  const [isMenuClosed, setIsMenuClosed] = useState(true);
  const { logout: logoutApi } = useAuth();
  const logout = useCallback(() => {
    // history.push("/");
    logoutApi();
  }, [logoutApi]);

  const toggleMenu = useCallback(() => {
    setIsMenuClosed(isMenuClosed => !isMenuClosed);
  }, []);
  const toggleProfile = useCallback(() => {
    setToogleProfile(toogleProfile => !toogleProfile);
  }, []);

  return (
    <nav className={`${styles.navBar} `}>
      <div className={styles.logo}>
        <img src={process.env.PUBLIC_URL + "/assets/images/logo2.png"}></img>
      </div>

      <div className={styles.buttonContainer}>
        <a href='#'>
      <Gravatar email={data} size={60} className={styles.avatar} default="monsterid" onClick={toggleProfile}/>:
      </a><div className={`${styles.openGroup} ${toogleProfile?styles.nodisplay:''}`}>
        <span>
          {data}
        </span>
        <button
          onClick={() => {
            alert("blah blah blah");
          }}
        >
          ویرایش اطلاعات <span className={styles.circle}></span>
        </button>
        <button onClick={logout}>
          خروج <span className={styles.circle}></span>
        </button>
        

        </div>
      </div>

      <div
        className={`${styles.linkContainer} ${styles.pageTitle} ${
          isMenuClosed ? styles.closed : styles.open
        }`}
      >
        <h1>تایتل این پست</h1>
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
