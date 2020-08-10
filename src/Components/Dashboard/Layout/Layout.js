import React, { useState, useEffect } from "react";
import styles from "./Layout.module.scss";
import NavBar from "../NavBar/NavBar";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <img
              src={process.env.PUBLIC_URL + "/assets/images/logo2.png"}
              alt="terme"
            ></img>
          </div>
          <NavBar />
        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;
