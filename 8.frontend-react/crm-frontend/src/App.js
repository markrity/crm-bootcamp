
// import './App.css';
// import Form from './components/Form';

import React from 'react';
import Home from './screens/Home';
import Signup from './screens/Signup';
import Login from './screens/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  let isUserAuthenticated = localStorage.getItem('jwtToken') ? true : false;
  console.log("isUserAuthenticated ", isUserAuthenticated);


  return (

    <Router>
    <div className="App">
      <Switch>
      <Route
          exact path="/"
          render={() => {
              return (
                isUserAuthenticated ?
                <Redirect to="/home" /> :
                <Redirect to="/signup" /> 
              )
          }}
        />
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}


export default App;
