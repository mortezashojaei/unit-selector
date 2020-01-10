import React, { useRef, useEffect } from "react";
import styles from "./PopUp.module.scss";
import ClassItem from "Components/Dashboard/PopUp/ClassItem/ClassItem";

/*
  our custom Hook that alerts clicks outside of the passed ref
 */
const useOutsideToggler = (popUpref, togglePopUp) => {
  /**
   * toggle the pop up's status if clicked on outside of element
   */
  const handleClickOutside = event => {
    if (popUpref.current && !popUpref.current.contains(event.target)) {
      togglePopUp();
    }
  };
  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
};

const PopUp = ({ classList, courseName, togglePopUp }) => {
  const popUpRef = useRef();

  useOutsideToggler(popUpRef, togglePopUp);

  return (
    <div className={styles.popUp}>
      <div className={styles.container} ref={popUpRef}>
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
