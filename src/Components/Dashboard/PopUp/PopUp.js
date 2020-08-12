import React, { useRef, useEffect, useCallback, useState } from "react";
import styles from "./PopUp.module.scss";
import ClassItem from "Components/Dashboard/PopUp/ClassItem/ClassItem";
import { fetchCourses } from "Utils/ApiCalls/CourseBox";
import { Dialogues } from "Utils/Dialogues";

const PopUp = ({ courseName, togglePopUp, setCourses, courses }) => {
  const popUpRef = useRef();
  const [classList, setClassList] = useState([]);

  const handleClickOutside = useCallback(
    (event) => {
      /* run the function when clicked outside of the ref */
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        togglePopUp();
      }
    },
    [togglePopUp]
  );

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    fetchCourses({ name: courseName })
      .then((res) => {
        setClassList(res.data.data);
      })
      .catch((error) => console.log(error));
  }, [courseName]);
  return (
    <div className={styles.popUp}>
      <div className={styles.container} ref={popUpRef}>
        <i onClick={togglePopUp} className="icon ion-md-close"></i>
        <h1 className={styles.title}>
          {Dialogues.takeTheCourse} : <span>{courseName}</span>
        </h1>
        <div className={styles.classList}>
          {classList.length > 0 &&
            classList.map((classItem) => (
              <ClassItem
                key={classItem.id}
                setCourses={setCourses}
                professorName={classItem["teacher_name"]}
                classTimes={classItem["class_times"]}
                classItem={classItem}
                togglePopUp={togglePopUp}
                courses={courses}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PopUp;
