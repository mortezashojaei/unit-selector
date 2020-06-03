import React from "react";
import styles from "./CourseHover.module.scss";
import { Dialogues } from "Utils/Dialogues";

const CourseHover = (props) => {
  const week = [
    null,
    Dialogues.saturday,
    Dialogues.sunday,
    Dialogues.monday,
    Dialogues.tuesday,
    Dialogues.wednesday,
    Dialogues.thursday,
    Dialogues.friday,
  ];
  const hour = [
    null,
    "08:00-10:00",
    "10:00-12:00",
    "13:30-15:30",
    "15:30-17:30",
  ];
  return (
    <div
      onMouseLeave={props.onMouseLeave}
      onMouseEnter={props.onMouseEnter}
      className={styles.mainDiv}
    >
      <div>
        {" "}
        {Dialogues.course} : <span className={styles.value}>{props.name}</span>
      </div>
      <div>
        {Dialogues.teacher} : <span> {props.teacher_name}</span>
      </div>
      <div>
        {Dialogues.time} :{" "}
        <span>
          {props.class_times.map((time) => (
            <div>
              <p>{week[time.day]} </p> <p>{hour[time.time]}</p>
            </div>
          ))}
        </span>
      </div>
      <div>
        {props.type === 0 ? (
          <span>{Dialogues.general}</span>
        ) : (
          <span>{Dialogues.specialized}</span>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default CourseHover;
