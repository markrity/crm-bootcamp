import React from "react";
import Header from '../../components/header'
import Button from '../../components/button'
import FormInput from'../../components/formInput'
import PLink from '../../components/pLink'
import axios from 'axios';
import '../../style/inputStyle.css'

import {
  Redirect
} from "react-router-dom";

import { connectToServerLogin } from '../../helpers/api_helpers';

class Login extends React.Component {

    constructor(props) {
      super(props);
      this.state = {email:'', password:'', errormessage: ''}
      this.handleChange_email = this.handleChange_email.bind(this)
      this.handleChange_password = this.handleChange_password.bind(this) 
    }

    handleClick = async ()  => {
      const params = {mail: this.state.email, password: this.state.password}
      const response = await connectToServerLogin(params)
      if(!response) {
        this.setState({errormessage:"That Beautiz account doesn't exist"})
      }
  } 

    handleChange_email(event) {
      this.setState({errormessage:''})
      this.setState({email: event.target.value});
    }

    handleChange_password(event) {
      this.setState({errormessage:''})
      this.setState({password: event.target.value});
    }

    render() {      
      
      return (
        <div>
        {this.props.isExist && <Redirect to="/home" />}

        <Header className="header" header_text = "Sign in"/>
        <FormInput label = "Email" type = "text" className ="input" placeholder= "example@text.com" onChange={this.handleChange_email} />
        <FormInput label = "Password" type = "password" className ="input" placeholder= "Password" onChange={this.handleChange_password} />
        <PLink   linkTo="reset" link_text="forget password?"/>
        <Button className="button" button_text="Login" onClick={() => this.handleClick()} />
        
        {this.state.errormessage}

        </div>
      );
    }
  
  }

  export default Login;
