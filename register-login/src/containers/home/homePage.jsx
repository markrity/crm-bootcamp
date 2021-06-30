import React from "react";

 import Button from '../../components/button'
 import axios from 'axios';

import {
    Redirect
  } from "react-router-dom";



class HomePage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {showLogin:false}
      this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick() { 
      localStorage.removeItem("my_user")
      window.location.href = "http://localhost:3000/login";
    }
   
    addUser() { 
      window.location.href = "http://localhost:3000/addUser";    }

    render() {
      return (
        <div>
         {!(this.props.isExist)&& <Redirect to="/login" />}
          <Button className="button" button_text="Logout" onClick={() => this.onButtonClick()}></Button> 
          <Button className="button" button_text="Add user" onClick={() => this.addUser()}></Button> 
        </div>
      );
    }
  }

  export default HomePage;
