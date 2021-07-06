//import '../App.css';
//import React from "react";
import React, { useEffect, useState } from "react";
import Controller from "./containers/controller/controller";
import HomePage from "./containers/home/homePage";
import axios from 'axios';
import './style/App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ResetPassword from "./containers/resetPassword/resetPassword";
import ChangePassword from "./containers/changePassword/changePassword";
import Register from "./containers/register/registerPage";
import SideBar from "./components/sideBar";
import Home_TopNav from "./components/home_topNav";


function App(props) {
  
  const [isExist, setExist] = useState(false);
  
  useEffect(() => {  
    var token = localStorage.getItem("my_user");
    console.log('useEffect');

    if (token) {
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
   
    <div>
    
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
        <Route path="/home"> <HomePage isExist={isExist} />  </Route>

        <Route  path="/login"> <Controller isExist={isExist} reg={false} log={true} newUser={false} /> </Route>

        <Route  path="/reset"><ResetPassword /></Route>

        <Route  path="/change/:id" component={ChangePassword}></Route>

        <Route  path="/register/:id" render={(props) => <Controller {...props}reg={true} log={false} newUser={true} />}/> 

      </Switch>
      </Router>
      </div>
  );
  }


export default App;
