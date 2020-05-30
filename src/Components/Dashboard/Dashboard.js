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
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import Menu from "./Drag-Drop/Menu";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Dialogues } from "Utils/Dialogues";

const Dashboard = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourseName, setSelectedCourseName] = useState("");
  const togglePopUp = () => {
    setShowPopUp((showPopUp) => {
      if (showPopUp) {
        setSelectedCourseName("");
      } else {
        setShowPopUp(true);
      }
    });
  };
  const onDelete = useCallback((id) => {
    deleteCourse(id)
      .then((response) => {
        return fetchUserCourses();
      })
      .then((response) => {
        setCourses(response.data.data);
        Swal.fire({
          icon: "success",
          title: "",
          text: Dialogues.wasDeletedSuccessfully,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: Dialogues.error,
          text: Dialogues.errorHappenedWhileDeleting,
        });
      });
  }, []);
  useEffect(() => {
    fetchUserCourses()
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: Dialogues.error,
          text: Dialogues.somethingWentWrong,
        });
      });
  }, []);

  useEffect(() => {
    if (selectedCourseName.length > 0) {
      setShowPopUp(true);
    }
  }, [selectedCourseName, showPopUp]);

  // close popup if user select  course in the popup

  useEffect(() => {
    setShowPopUp(false);
    setSelectedCourseName("");
  }, [courses]);

  return (
    <DndProvider backend={Backend}>
      <header className={styles.header}>
        <NavBar />
      </header>
      <main className={styles.main}>
        <Menu>
          <Calender {...{ courses }} onDelete={onDelete} />
        </Menu>
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
      </main>
    </DndProvider>
  );
};

export default Dashboard;
