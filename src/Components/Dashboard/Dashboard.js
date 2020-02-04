import React, { useState, useEffect, useCallback } from "react";
import NavBar from "./NavBar/NavBar";
import styles from "./Dashboard.module.scss";
import CourseBox from "./CourseBox/CourseBox";
import PopUp from "./PopUp/PopUp";
import { CSSTransitionGroup } from "react-transition-group";
import { popUpFakeData } from "Utils/popUpFakeData";
import "./DashboardAnimations.scss";
import Calender from "Components/Calender/Calender";
import { fetchUserCourses, deleteCourse } from "Utils/ApiCalls/CourseBox";

const Dashboard = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [courses, setCourses] = useState([]);
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
  const onDelete = useCallback(id => {
    // alert(id);
    deleteCourse(id)
      .then(response => {
        return fetchUserCourses();
      })
      .then(response => {
        setCourses(response.data.data);
      })
      .catch(() => {
        alert(`couldn't delete `);
      });
  }, []);
  useEffect(() => {
    fetchUserCourses()
      .then(response => {
        setCourses(response.data.data);
      })
      .catch(() => {
        alert("something went wrong while trying to fetch user's schedule");
      });
  }, []);

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
        <Calender {...{ courses }} onDelete={onDelete} />
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
            <PopUp
              setCourses={setCourses}
              courseName={selectedCourseName}
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
