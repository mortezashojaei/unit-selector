import React, { useState } from "react";
import CourseListItem from "../CourseListItem/CourseListItem";
import styles from "./CourseList.module.scss";

const CourseList = props => {
  const [showMore, setShowMore] = useState(false);
  const onMoreClick = () => {
    setShowMore(!showMore);
  };
  return (
    <div className={styles.mainDiv}>
      <div className={`${styles.list} ${showMore && styles.scroll}`}>
        {props.courses.map(course => {
          //   console.log(course);
          return (
            <CourseListItem
              key={course.id}
              onSelect={props.onSelect}
              {...course}
            />
          );
        })}
      </div>
      {!showMore && (
        <button onClick={onMoreClick} className={`${styles.more}`}>
          بیش تر...
        </button>
      )}
    </div>
  );
};

export default CourseList;
