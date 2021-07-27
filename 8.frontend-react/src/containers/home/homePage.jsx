import React from "react";
import Button from '../../components/button'
import Users from '../users/users'
import '../../style/sideBarStyle.css'
import {removeFromLS} from '../../helpers/local_storage_helper';
import Client from '../clients/clients'
import axios from 'axios';


import {
    Redirect
  } from "react-router-dom";
import Home_TopNav from "../../components/home_topNav";
import Graph1 from "../../components/graph1";
import Graph2 from "../../components/graph2";
import Graph3 from "../../components/graph3";
import Graph4 from "../../components/graph4";
class HomePage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {showUsers:false}
      this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick() { 
      removeFromLS();
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
        
           <div className="all_graphs"> 
           <Graph1/>
           <Graph2/>
           <Graph3/>
           <Graph4/>

           </div>
        
         {this.state.showUsers && <Users/>}
       
        </body>
        </div>
      );
    }
  }

  export default HomePage;
