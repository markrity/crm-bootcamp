
// import './App.css';
// import Form from './components/Form';
import AuthApi from './helpers/authApi';
import React, { useState } from 'react';
import Home from './screens/Home';
import Signup from './screens/Signup';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
const authApi = new AuthApi();

function App() {

  const jwtToken = localStorage.getItem('jwtToken');
  let isUserAuthenticated = false;
  if(jwtToken){
    isUserAuthenticated = true;
  }

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
      </Switch>
    </div>
  </Router>
  );
}


export default App;
