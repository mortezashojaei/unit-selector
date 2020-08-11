import React from "react";
import Routing from "./Routing";
import Provider from "react-redux/es/components/Provider";
import store from "../../Store";
import 'sweetalert2/src/sweetalert2.scss'
import "./App.scss";

function App() {
  return (
    <Provider store={store}>5
      <Routing />
    </Provider>
  );
}

export default App;
