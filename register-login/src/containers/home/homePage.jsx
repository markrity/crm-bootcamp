import React from "react";

 import Button from '../../components/button'


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
   
    render() {
    // var isExist;
    // localStorage.getItem("my_user") ? isExist=true : isExist = false
      return (
        <div>
         {!(this.props.isExist)&& <Redirect to="/login" />} <Button className="button" button_text="Logout" onClick={() => this.onButtonClick()}></Button> 
        </div>
      );
    }
  }

  export default HomePage;
