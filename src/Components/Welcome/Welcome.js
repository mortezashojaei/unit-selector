import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { CSSTransitionGroup } from "react-transition-group";
import SignupForm from "Components/Welcome/SignupContainer/SignupForm/SignupForm";
import SignupContainer from "Components/Welcome/SignupContainer/SignupContainer";
import LoginForm from "Components/Welcome/LoginForm/LoginForm";
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
          <Switch>
            <Route path="/signup" exact component={SignupContainer} />
            <Route path="/login" exact component={LoginForm} />
          </Switch>
        </section>
      </main>
    </>
  );
};

export default Welcome;
