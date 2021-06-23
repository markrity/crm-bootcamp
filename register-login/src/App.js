//import './App.css';
import React from "react";
import Register from './containers/register/registerPage'
import Login from './containers/login/loginPage'
import Controller from "./containers/controller/controller";
class App extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() { 
    return (   
      <div className="box-container">
      
          {localStorage.getItem("my_user") ? <div>Logged in</div> : <Controller/> } 
          
      </div>
    );
  }
}


export default App;
