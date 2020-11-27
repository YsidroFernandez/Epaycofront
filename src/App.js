import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginView from './views/login/login.view';
import HomeView from './views/home/home.view';


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
          path="/"
          component={LoginView} 
        />
       
      </Switch>

    </Router>


  );
}


export default App;
