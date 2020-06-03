import React from "react";
import { Route, Switch } from "react-router-dom";
import SignupContainer from "Components/Welcome/SignupContainer/SignupContainer";
import LoginForm from "Components/Welcome/LoginForm/LoginForm";
import styles from "./Welcome.module.scss";
import TabBar from "Components/Welcome/TabBar/TabBar";
import { Dialogues } from "Utils/Dialogues";

const Welcome = () => {
  return (
    <>
      <main className={`${styles.welcome} container`}>
        <section>
          <figure key="figure">
            <div className={styles.logo}>
              <img
                src={process.env.PUBLIC_URL + "/assets/images/logo2.png"}
                alt={"terme"}
              ></img>
            </div>
            <figcaption>
              <h1>{Dialogues.unitSelectorSystem}</h1>
              <div>
                {Dialogues.forKharazmiStudents}
                <img
                  src="./assets/images/khuLogo-black.png"
                  alt={Dialogues.kharazmiUniversity}
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
