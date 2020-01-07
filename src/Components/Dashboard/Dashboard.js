import React from "react";
import NavBar from "./NavBar/NavBar";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  return (
    <>
      <header className={styles.header}>
        <NavBar />
      </header>
      <main className={styles.main}>main items go here</main>
    </>
  );
};

export default Dashboard;
