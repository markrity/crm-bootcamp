import React from "react";
import DivController from "../../components/divController";
import Register from '../../containers/register/registerPage'
import Login from '../../containers/login/loginPage'
import TopNav from '../../components/topNav'

import '../../style/controllerStyle.css';
import '../../style/button.css';
class Controller extends React.Component {

    constructor(props) {
      super(props);
      this.state={isRegisterOpen:props.reg, isLoginOpen:props.log}
      if (props.newUser) {
        localStorage.removeItem("my_user")
      }
      
    }

    handleClickLogin() {
        this.setState({isLoginOpen: true,  isRegisterOpen: false})
    }
    
    
    handleClickRegister() {
        this.setState({isLoginOpen: false,  isRegisterOpen: true})
    }
    

    render() {
      return (
        <body> 
      <TopNav/>
        <div className="test_login">
        <div className="para">
          <img className = "mainImg" src="https://image.freepik.com/free-photo/beautician-woman-clinic_23-2148878877.jpg"  width="626" height="526" ></img>
          <h1>Learn how manage your clinic easier.</h1>
          </div> 
        <div className="controller">
        {this.state.isLoginOpen && <Login isExist={this.props.isExist} />}
        {this.state.isRegisterOpen && <Register newUser={this.props.newUser}  props={this.props} />}
        <div className="controller_header">
        {!this.props.newUser && this.state.isRegisterOpen && <DivController p_text="Already have an account?" click_text = "Click here to sign in" onClick={() => this.handleClickLogin()}/> }
        {!this.props.newUser &&this.state.isLoginOpen && <DivController p_text="Don't have an account yet?" click_text = "Click here to start a free 30-day trial" onClick={() => this.handleClickRegister()}/>}
        </div>
        </div>
        </div>
        </body>
      );
    
  
  }
}

  export default Controller;
