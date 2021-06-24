//import './App.css';
import React from "react";
import Controller from "./containers/controller/controller";
import HomePage from "./containers/home/homePage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

const user = localStorage.getItem("my_user")
var isExist=false;

if(user) {
  isExist=true;
}


class App extends React.Component {
  constructor(props) {
    super(props);
  }

 

  render() { 
    return (   
      <Router>
          <Switch>
          <Route
          exact path="/"
          render={() => {
              return (
                isExist ?
                <Redirect to="/home" /> :
                <Redirect to="/login" /> 
              )
          }}
         />
          <Route exact path="/home">
             <HomePage/> 
          </Route>

          <Route exact path="/login">
             <Controller />
          </Route>

        </Switch>
       </Router>

       
    );
  }
}


export default App;
