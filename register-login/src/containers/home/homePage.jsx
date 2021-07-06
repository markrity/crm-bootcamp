import React from "react";
import Button from '../../components/button'
import Users from '../users/users'
import '../../style/sideBarStyle.css'
import { removeFromLS } from '../../helpers/local_storage_helper';

import axios from 'axios';


import {
    Redirect
  } from "react-router-dom";
import SideBar from "../../components/sideBar";
import Home_TopNav from "../../components/home_topNav";

class HomePage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {showLogin:false,showUsers:false}
      this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick() { 
      removeFromLS();
      window.location.href = "http://localhost:3000/login";
    }

    // phpRequest() { 
    //   // console.log('php req');
    //   axios.post('http://localhost:991/test/test/').then(response => {
    //       console.log('respose from php!!!');
    //       console.log(JSON.stringify(response.data))
    //       })
    // }


    onClickUser() {
      this.setState({showUsers:true})
    }

    render() {
      return (
        <div>
         {!(this.props.isExist)&& <Redirect to="/login" />}
         <body>

         <SideBar onClick={() => this.onClickUser()}/>
         <Home_TopNav className="button1" button_text="Logout" onClick={() => this.onButtonClick()} />
         {/* <Button className = "button1" button_text="php" onClick={()=>this.phpRequest()}></Button>  */}

         {this.state.showUsers && <Users/>}
       
        </body>
        </div>
      );
    }
  }

  export default HomePage;
