import React, { useState, useEffect } from "react";
import CourseList from "../CourseList/CourseList";
import styles from "./CourseBox.module.scss";
import { fetchCourses } from "Utils/ApiCalls/CourseBox";
import { Dialogues } from "Utils/Dialogues";

const CourseBox = (props) => {
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("chart");
  const [toggleType, setToggleType] = useState({
    chart: "active",
    public: "",
  });
  const filterCourses = () => {
    // console.log(courses);
    return courses
      .filter((course) => course.name.includes(searchText.trim()))
      .filter((course) => {
        if (type === "chart") {
          return course.type === 1;
        } else {
          return course.type === 0;
        }
      });
  };
  useEffect(() => {
    fetchCourses()
      .then((res) => {
        setCourses(res.data.data);
      })
      .catch((e) => {});
  }, []);
  const onInputChange = (e) => {
    setSearchText(e.target.value);
  };
  const onSelect = (name) => {
    // console.log(courses.find(course => course.id === id));
    props.setSelectedCourseName(name);
    //   const onSelect = id => {
    //       let course = courses.find(course => course.id === id)
    //       addCourse({course_id: course.id}).then(res => {
    //           console.log('sucseed')
    //       }).catch(e => {
    //           console.log('error')
    //       })
    //     console.log(courses.find(course => course.id === id));
    //   const onSelect = id => {
    //       let course = courses.find(course => course.id === id)
    //       addCourse({course_id: course.id}).then(res => {
    //           console.log(res)
    //       }).catch(e => {
    //           console.log('error')
    //       })
    //     console.log(courses.find(course => course.id === id));
  };
  const onChartFilter = () => {
    setToggleType({
      chart: "active",
      public: "",
    });
    setType("chart");
  };
  const onPublicFilter = () => {
    setToggleType({
      public: "active",
      chart: "",
    });
    setType("public");
  };
  return (
    <div className={styles.mainDiv}>
      <p>{Dialogues.courseSearcher}</p>
      <input
        value={searchText}
        onChange={onInputChange}
        placeholder={`${Dialogues.typeTheCourseName}...`}
      />
      <div className={styles.buttonContainer}>
        <button className={styles[toggleType.public]} onClick={onPublicFilter}>
          {Dialogues.courses} <span>{Dialogues.general}</span>
        </button>
        <button
          className={styles[toggleType.chart]}
          autoFocus
          onClick={onChartFilter}
        >
          {Dialogues.courses} <span>{Dialogues.chart}</span>
        </button>
      </div>
      <CourseList onSelect={onSelect} courses={courses && filterCourses()} />
    </div>
  );
};

export default CourseBox;
