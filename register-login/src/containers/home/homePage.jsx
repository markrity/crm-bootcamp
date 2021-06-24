import React from "react";
import Header from '../../components/header'
 import Button from '../../components/button'
 import FormInput from'../../components/formInput'
 import Controller from '../controller/controller'
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";



class HomePage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {showLogin:false}
      this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick() { 
        window.location.href = "http://localhost:3000/login";
        localStorage.removeItem("my_user")
      }
   
    render() {
    var user = localStorage.getItem("my_user")
    var isExist=false;
    if(user) {
    isExist=true;
    }
      return (
        <div>
        {console.log(isExist)}
         {(!isExist)&& <Redirect to="/login" />} <Button button_text="Logout" onClick={() => this.onButtonClick()}></Button> 
        </div>
      );
    }
  }

  export default HomePage;
