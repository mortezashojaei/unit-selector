import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Provider from "react-redux/es/components/Provider";
import { Dialogues } from "./Utils/Dialogues";
import store from './Store'
function App() {
  return (
    <Provider store={store}>
      <div>{Dialogues.Wellcome}</div>
    </Provider>
  );
}

export default App;
