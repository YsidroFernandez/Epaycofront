import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginView from './views/login/login.view';
import HomeView from './views/home/home.view';
import RegisterView from './views/register/register.view';

function App() {
  return (

    <Router>
      <Switch>
      <Route
          exact
          path="/home"
          component={HomeView}
        />
        <Route
          exact
          path="/register"
          component={RegisterView}
        />
        <Route
          path="/"
          component={LoginView} 
        />
       
      </Switch>

    </Router>


  );
}


export default App;
