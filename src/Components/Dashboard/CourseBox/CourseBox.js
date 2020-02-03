import React, { useState, useEffect } from "react";
import CourseList from "../CourseList/CourseList";
import styles from "./CourseBox.module.scss";
import { fetchCourses } from "Utils/ApiCalls/CourseBox";

const CourseBox = props => {
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState(1);
  const [toggleType, setToggleType] = useState({
    chart: "active",
    public: ""
  });
  const filterCourses = () => {
    // console.log(courses);
    return courses
      .filter(course => course.name.includes(searchText.trim()))
      .filter(course => course.type === type);
  };
  useEffect(() => {
    fetchCourses()
      .then(res => {
        setCourses(res.data.data);
      })
      .catch(e => {});
  }, []);
  const onInputChange = e => {
    setSearchText(e.target.value);
  };
  const onSelect = name => {
    // console.log(courses.find(course => course.id === id));
    props.setSelectedCourseName(name);
  };
  const onChartFilter = () => {
    setToggleType({
      chart: "active",
      public: ""
    });
    setType("chart");
  };
  const onPublicFilter = () => {
    setToggleType({
      public: "active",
      chart: ""
    });
    setType("public");
  };
  return (
    <div className={styles.mainDiv}>
      <p>جستجوگر درس</p>
      <input
        value={searchText}
        onChange={onInputChange}
        placeholder=" نام درس را تایپ کنید..."
      />
      <div className={styles.buttonContainer}>
        <button className={styles[toggleType.public]} onClick={onPublicFilter}>
          دروس <span>عمومی</span>
        </button>
        <button
          className={styles[toggleType.chart]}
          autoFocus
          onClick={onChartFilter}
        >
          دروس <span>چارت</span>
        </button>
      </div>
      <CourseList onSelect={onSelect} courses={courses && filterCourses()} />
    </div>
  );
};

export default CourseBox;
