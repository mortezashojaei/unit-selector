import React from "react";
import NavBar from "./NavBar/NavBar";
import styles from "./Dashboard.module.scss";
import CourseBox from "./CourseBox/CourseBox";

const Dashboard = () => {
  return (
    <>
      <header className={styles.header}>
        <NavBar />
      </header>
      <main className={styles.main}>
        <CourseBox />
      </main>
    </>
  );
};

export default Dashboard;
