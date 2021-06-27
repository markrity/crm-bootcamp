
// import './App.css';
// import Form from './components/Form';

import React, { useState, useEffect } from 'react';
// import React, { useEffect } from 'react';
import Home from './screens/Home';
import Signup from './screens/Signup';
import Login from './screens/Login';
import AuthApi from './helpers/authApi';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
const axios = require('axios');

const authApi = new AuthApi();
function App() {

  const [isConnect, setConnection] = useState(false);
  const [isLoading, setLoading] = useState(true);

  
    useEffect(async () => {

      // if(localStorage.getItem('jwtToken')){
        console.log("********************");
        const isUserAuthenticated = await authApi.ping();
        console.log(isUserAuthenticated);
        setConnection(isUserAuthenticated);
        setLoading(false);
      // } else {
      //   setConnection(false);
      //   setLoading(false);
      // }
  }, [])


  return (

    <Router>
    <div className="App">
      <Switch>
      <Route
          exact path="/"
          render={() => {
              return ( isLoading ? 
                (<div>Loading</div>) : 
                isConnect ?
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
