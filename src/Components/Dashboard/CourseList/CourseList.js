import React, { useState } from "react";
import CourseListItem from "../CourseListItem/CourseListItem";
import styles from "./CourseList.module.scss";

const CourseList = props => {
  const [showMore, setShowMore] = useState(false);
  const onMoreClick = () => {
    setShowMore(!showMore);
  };
  const fakeNames = [
    {name: "ریاضی", id: 1},
    {name: "1ریاضی", id: 2},
    {name: "2ریاضی", id: 3}
  ]
  return (
    <div className={styles.mainDiv}>
      <div className={`${styles.list} ${showMore && styles.scroll}`}>
        {fakeNames.map(course => {
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
