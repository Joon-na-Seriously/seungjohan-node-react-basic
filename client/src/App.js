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

function App() {
  return (

    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/loginpage" component={LoginPage}/>
          <Route exact path="/registerpage" component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;