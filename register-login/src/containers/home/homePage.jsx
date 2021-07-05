import React from "react";
import Button from '../../components/button'
import Users from '../users/users'
import '../../style/sideBarStyle.css'

import {
    Redirect
  } from "react-router-dom";
import SideBar from "../../components/sideBar";

class HomePage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {showLogin:false,showUsers:false}
      this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick() { 
      localStorage.removeItem("my_user")
      window.location.href = "http://localhost:3000/login";
    }

    onClickUser() {
      this.setState({showUsers:true})
    }

    render() {
      return (
        <div>
         {!(this.props.isExist)&& <Redirect to="/login" />}
         <body>
         <SideBar onClick={() => this.onClickUser()}/>
         <div className="topnav">
          <div className="topnav_text">
              Beautiz
          </div>
          <div className="buttons">
          <Button className="button1" button_text="Logout" onClick={() => this.onButtonClick()}></Button> 
          </div>
        </div>
       
         {this.state.showUsers && <Users/>}
       
        </body>
        </div>
      );
    }
  }

  export default HomePage;
