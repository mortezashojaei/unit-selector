import React from "react";
import { Link, Route } from "react-router-dom";
import SignupForm from "Components/SignupForm/SignupForm";
import LoginForm from "Components/LoginForm/LoginForm";
import styles from "./Welcome.module.scss";
import TabBar from "Components/TabBar/TabBar";

const Welcome = () => (
  <>
    <header>
      <TabBar />
    </header>
    <main className={`${styles.welcome} container`}>
      <figure>
        <img src="./assets/images/khuLogo-black.png" alt="دانشگاه خوارزمی" />
        <figcaption>
          <h1>سیستم شبیه ساز انتخاب واحد</h1>
          برای دانشجویان : دانشگاه خوارزمی
        </figcaption>
      </figure>
      {/* show the navigation buttons if we're on the home route */}

      <Route path="/signup" exact component={SignupForm} />
      <Route path="/login" exact component={LoginForm} />
    </main>
  </>
);

export default Welcome;
