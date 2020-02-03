import React from "react";

const Course = ({ course, onDelete }) => {
  return course ? (
    <div className="course-card">
      <div
        onClick={() => {
          onDelete(course.register_id);
        }}
        className="delete-course"
      >
        <i className="icon ion-md-close-circle"></i>
      </div>
      <div className="course-name">{course.name}</div>
      <div className="course-teacher">{course.teacher_name}</div>
    </div>
  ) : null;
};

export default Course;
