import React, { useState } from "react";
import CourseListItem from "../CourseListItem/CourseListItem";

const CourseList = props => {
  return (
    <div>
      <ul>
        {props.courses.map(course => (
          <CourseListItem onSelect={props.onSelect} {...course} />
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
