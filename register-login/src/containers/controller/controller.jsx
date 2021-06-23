import React from "react";
import DivController from "../../components/divController";
import Register from '../../containers/register/registerPage'
import Login from '../../containers/login/loginPage'

class Controller extends React.Component {

    constructor(props) {
      super(props);
      this.state={isRegisterOpen:false, isLoginOpen:true}
      
    }

    handleClickLogin() {
        this.setState({isLoginOpen: true,  isRegisterOpen: false})
    }
    
    
    handleClickRegister() {
        this.setState({isLoginOpen: false,  isRegisterOpen: true})
    }
    

    render() {
      return (
        <div>
        <DivController header_text = "Login" onClick={() => this.handleClickLogin()}/>
        <DivController header_text = "Sign Up" onClick={() => this.handleClickRegister()}/>
        {this.state.isLoginOpen && <Login />}
        {this.state.isRegisterOpen && <Register />}
        </div>
      );
    
  
  }
}

  export default Controller;
