import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
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
        <BrowserRouter>
          <Switch>
            <Route path="/signup" component={SignupForm}/>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
