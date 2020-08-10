import React, { useCallback, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styles from "./NavBar.module.scss";
import Gravatar from "react-gravatar";
import { useAuth } from "Utils/Authentication/Auth";
import { info } from "Utils/ApiCalls/Auth";
import { Dialogues } from "Utils/Dialogues";

const NavBar = ({ history }) => {
  const [data, setData] = useState(localStorage.getItem("email"));
  useEffect(() => {
    info().then(function (response) {
      if (response.data) setData(response.data.data.email);
      localStorage.setItem("email", response.data.data.email);
    });
  }, []);
  const [toogleProfile, setToogleProfile] = useState(true);
  const { logout: logoutApi } = useAuth();
  const logout = useCallback(() => {
    // history.push("/");
    logoutApi();
  }, [logoutApi]);

  const toggleProfile = useCallback(() => {
    setToogleProfile((toogleProfile) => !toogleProfile);
  }, []);

  return (
      <nav className={`${styles.navBar} `}>
        <div className={styles.buttonContainer}>
          <button>
            <Gravatar
              email={data}
              size={60}
              className={styles.avatar}
              onClick={toggleProfile}
            />
          </button>
          <div
            className={`${styles.openGroup} ${
              toogleProfile ? styles.nodisplay : ""
            }`}
          >
            <span>
              {data}
              <i className="icon ion-ios-contact"></i>
            </span>
            <button>
              {Dialogues.editInfo}
              <i className="icon ion-ios-settings"></i>
            </button>
            <button onClick={logout}>
              {Dialogues.exit}
              <i className="icon ion-ios-log-out"></i>
            </button>
          </div>
        </div>

        <div className={`${styles.linkContainer}`}>
          <h1>{Dialogues.termeUnitSelectorSystem}</h1>
          {/*
        <Link to="#">لینک اول منو</Link>
        <Link to="#">لینک دوم منو</Link>
        <Link to="#">لینک سوم منو</Link>
        <Link to="#">لینک چهارم منو</Link>
        */}
        </div>
        {/* <button className={styles.toggleButton} onClick={toggleMenu}>
        <i className={`icon ion-md-${isMenuClosed ? "menu" : "close"}`}></i>
      </button> */}
      </nav>
  );
};

export default withRouter(NavBar);
