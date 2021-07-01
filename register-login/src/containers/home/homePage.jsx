import React from "react";

 import Button from '../../components/button'
 import axios from 'axios';
 import Users from '../../components/users'

import {
    Redirect
  } from "react-router-dom";
import AddUser from "../addUser/addUser";

class HomePage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {showLogin:false,showUsers:false, showAddUser: false}
      this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick() { 
      localStorage.removeItem("my_user")
      window.location.href = "http://localhost:3000/login";
    }
   
    addUser() { 
      this.setState({showAddUser:true, showUsers: false})
    }

    onClickUser() {

      this.setState({showUsers:true, showAddUser:false})
    }

    render() {
      return (
        <div>
         {!(this.props.isExist)&& <Redirect to="/login" />}
         <body>
         <div className="topnav">
          <div className="topnav_text">
              Beautiz
          </div>
          <div className="buttons">
          <Button className="button1" button_text="Users" onClick={() => this.onClickUser()}></Button>
          <Button className="button1" button_text="Add user" onClick={() => this.addUser()}></Button>
          <Button className="button1" button_text="Logout" onClick={() => this.onButtonClick()}></Button> 
          </div>
        </div>
        <div className="text">
         {this.state.showAddUser && <AddUser/>}
          {this.state.showUsers && <Users/>}
        </div>
          </body>
        </div>
      );
    }
  }

  export default HomePage;
