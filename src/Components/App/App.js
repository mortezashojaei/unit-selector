import React from "react";
import Routing from "./Routing";
import Provider from "react-redux/es/components/Provider";
import store from "../../Store";
import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
}

export default App;
