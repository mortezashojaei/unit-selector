import React, { useState } from "react";
import PropTypes from "prop-types";
import { weekDays, dayTimes } from "Utils/Dialogues";
import { popUpFakeData } from "Utils/popUpFakeData";
import styles from "./ClassItem.module.scss";

// this function should handle the collisions
/* weekly schedule should be fetched from redux's store 
or 
fetched directly from server via ajax requests */
const handleCollisions = (currentClass, weeklySchedule) => {
  let collidedClass = null;
  // for now we'll just show some fake data
  if (currentClass.professorName === popUpFakeData[0].professorName) {
    collidedClass = "معماری کامپیوتر";
    return (
      <p className={styles.collisionError}>
        تداخل زمانی با درس
        {" " + collidedClass}
      </p>
    );
  }
  return false;
};

const showClassTimes = classTimes => {
  return classTimes.map(classItem => (
    <span>
      {" "}
      {weekDays[classItem.day]} : {dayTimes[classItem.time]}{" "}
    </span>
  ));
};

const ClassItem = ({ professorName, classTimes }) => {
  return (
    <div className={styles.classItem}>
      <p className={styles.professorName}>{professorName}</p>
      <p className={styles.classTimes}>{showClassTimes(classTimes)}</p>
      {handleCollisions({ professorName, classTimes }) || (
        <button
          className={styles.pickClass}
          onClick={() => {
            alert("done");
          }}
        >
          اخذ کلاس
        </button>
      )}
    </div>
  );
};

ClassItem.propTypes = {
  professorName: PropTypes.string.isRequired,
  classTimes: PropTypes.array.isRequired
};

export default ClassItem;
