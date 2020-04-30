import React, { useRef, useEffect, useCallback } from "react";
import styles from "./PopUp.module.scss";
import ClassItem from "Components/Dashboard/PopUp/ClassItem/ClassItem";

const PopUp = ({ classList, courseName, togglePopUp }) => {
  const popUpRef = useRef();

  const handleClickOutside = useCallback(
    event => {
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

  return (
    <div className={styles.popUp}>
      <div className={styles.container} ref={popUpRef}>
        <i onClick={togglePopUp} className="icon ion-md-close"></i>
        <h1 className={styles.title}>
          اخذ درس : <span>{courseName}</span>
        </h1>
        <div className={styles.classList}>
          {classList.map(classItem => (
            <ClassItem
              key={classItem.professorName}
              professorName={classItem.professorName}
              classTimes={classItem.classTimes}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopUp;
