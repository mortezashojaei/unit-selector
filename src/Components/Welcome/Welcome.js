import React from "react";
import { Link, Route } from "react-router-dom";
import SignupForm from "Components/SignupForm/SignupForm";
import SignupContainer from "../../Components/SignupContainer/SignupContainer";
import LoginForm from "Components/LoginForm/LoginForm";
import styles from "./Welcome.module.scss";
import TabBar from "Components/TabBar/TabBar";

const Welcome = () => (
  <>
    <main className={`${styles.welcome} container`}>
      <section>
        <figure>
          <div className={styles.logo}>logo will be here</div>
          <figcaption>
            <h1>سیستم شبیه ساز انتخاب واحد</h1>
            <div>
              برای دانشجویان : دانشگاه خوارزمی
              <img
                src="./assets/images/khuLogo-black.png"
                alt="دانشگاه خوارزمی"
              />
            </div>
          </figcaption>
        </figure>
        <TabBar />
        <Route path="/signup" exact component={SignupContainer} />
        <Route path="/login" exact component={LoginForm} />
      </section>
    </main>
  </>
);

export default Welcome;
