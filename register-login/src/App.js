//import './App.css';
//import React from "react";
import React, { useEffect, useState } from "react";
import Controller from "./containers/controller/controller";
import HomePage from "./containers/home/homePage";
import './style/app.css'
import axios from 'axios';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


var counter=0;

function App() {
  
  const [isExist, setExist] = useState(false);
  
  useEffect(() => {
   // setExist(false)
  
    var token = localStorage.getItem("my_user");
    if (token) {
    console.log(counter++)
    axios.post('http://kerenadiv.com:8005/ping', {
      token: token
      }).then(response => {
          if (response.data.status) {
            
            setExist(true)
          }
        })
      }
  });

 
  return (   
    <Router>
        <Switch>
        <Route
        exact path="/"
        render={() => {
            return (
              {isExist} ?
              <Redirect to="/home" /> :
              <Redirect to="/login" /> 
            )
        }}
        />
        <Route path="/home">
            <HomePage isExist={isExist} /> 
        </Route>

        
        <Route  path="/login">
            <Controller isExist={isExist} />
        </Route>

      </Switch>
      </Router>
  );
  }


export default App;
