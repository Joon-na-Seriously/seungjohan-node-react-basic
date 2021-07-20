import "./App.css";
import React from 'react';

// Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

//for auth to put the components in the HOC
import Auth from './hoc/auth'

function App() {
  return (

    <Router>
      <div>
        <Switch>
          //Auth 로 감싸고 옵션을 더 준다.
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;