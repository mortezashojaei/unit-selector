import React from "react";
import "./App.scss";
import Provider from "react-redux/es/components/Provider";
import { Dialogues } from "../../Utils/Dialogues";
import store from "../../Store";
import SignupForm from '../Signup Form/SignupForm'
function App() {
  return (
    <Provider store={store}>
      <div>
        {Dialogues.Wellcome}
        <SignupForm/>
      </div>
    </Provider>
  );
}

export default App;
