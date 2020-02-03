import React, { useState, useEffect } from "react";
import NavBar from "./NavBar/NavBar";
import styles from "./Dashboard.module.scss";
import CourseBox from "./CourseBox/CourseBox";
import PopUp from "./PopUp/PopUp";
import { CSSTransitionGroup } from "react-transition-group";
import { popUpFakeData } from "Utils/popUpFakeData";
import "./DashboardAnimations.scss";

const Dashboard = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState("");
  const togglePopUp = () => {
    setShowPopUp(showPopUp => {
      if (showPopUp) {
        setSelectedCourseName("");
        setShowPopUp(false);
      } else {
        setShowPopUp(true);
      }
    });
  };
  useEffect(() => {
    if (selectedCourseName.length > 0) {
      setShowPopUp(true);
    }
  }, [selectedCourseName, showPopUp]);
  return (
    <>
      <header className={styles.header}>
        <NavBar />
      </header>
      <main className={styles.main}>
        <CourseBox setSelectedCourseName={setSelectedCourseName} />
        <CSSTransitionGroup
          transitionName="popUp"
          transitionEnterTimeout={300}
          transitionLeave={true}
          transitionLeaveTimeout={300}
          transitionAppearTimeout={300}
          transitionAppear={true}
        >
          {showPopUp && (
            <PopUp courseName={selectedCourseName} togglePopUp={togglePopUp} />
          )}
        </CSSTransitionGroup>
        <button onClick={togglePopUp}>show the pop up</button>
      </main>
    </>
  );
};

export default Dashboard;
