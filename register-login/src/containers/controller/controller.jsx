import React from "react";
import DivController from "../../components/divController";
import Register from '../../containers/register/registerPage'
import Login from '../../containers/login/loginPage'

import '../../style/controllerStyle.css';

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
        <div className="controller">
       
        {this.state.isLoginOpen && <Login isExist={this.props.isExist} />}
        {this.state.isRegisterOpen && <Register />}
        <div className="controller_header">

        
        {this.state.isRegisterOpen && <DivController p_text="Already have an account?" click_text = "Click here to sign in" onClick={() => this.handleClickLogin()}/> }
        {this.state.isLoginOpen && <DivController p_text="Don't have an account yet?" click_text = "Click here to start a free 30-day trial" onClick={() => this.handleClickRegister()}/>}
        </div>
        </div>
      );
    
  
  }
}

  export default Controller;
