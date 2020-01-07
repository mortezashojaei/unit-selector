import React from "react";
import { Link, Route } from "react-router-dom";
import { CSSTransitionGroup } from "react-transition-group";
import SignupForm from "Components/Welcome/SignupContainer/SignupForm/SignupForm";
import SignupContainer from "./SignupContainer/SignupContainer";
import LoginForm from "Components/Welcome/SignupContainer/LoginForm/LoginForm";
import styles from "./Welcome.module.scss";
import TabBar from "Components/Welcome/TabBar/TabBar";

const Welcome = () => {
  return (
    <>
      <main className={`${styles.welcome} container`}>
        <section>
          <figure key="figure">
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
};

export default Welcome;
