import React, { useState } from "react";
import NavBar from "./NavBar/NavBar";
import styles from "./Dashboard.module.scss";
import CourseBox from "./CourseBox/CourseBox";
import PopUp from "./PopUp/PopUp";
import { CSSTransitionGroup } from "react-transition-group";
import { popUpFakeData } from "Utils/popUpFakeData";
import "./DashboardAnimations.scss";

const Dashboard = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const togglePopUp = () => {
    setShowPopUp(showPopUp => !showPopUp);
  };
  return (
    <>
      <header className={styles.header}>
        <NavBar />
      </header>
      <main className={styles.main}>
        <CourseBox />
        <CSSTransitionGroup
          transitionName="popUp"
          transitionEnterTimeout={600}
          transitionLeave={true}
          transitionLeaveTimeout={600}
          transitionAppearTimeout={600}
          transitionAppear={true}
        >
          {showPopUp && (
            <PopUp
              classList={popUpFakeData}
              courseName={"تحلیل و طراحی سیستم ها"}
              togglePopUp={togglePopUp}
            />
          )}
        </CSSTransitionGroup>
        <button onClick={togglePopUp}>show the pop up</button>
      </main>
    </>
  );
};

export default Dashboard;
