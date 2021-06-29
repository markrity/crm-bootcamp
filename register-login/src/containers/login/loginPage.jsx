import React from "react";
import Header from '../../components/header'
 import Button from '../../components/button'
 import FormInput from'../../components/formInput'
import axios from 'axios';
import '../../style/inputStyle.css'

import {
  Redirect
} from "react-router-dom";
import PLink from "../../components/pLink";

class Login extends React.Component {

    constructor(props) {
      super(props);
      this.state = {email:'', password:'', errormessage: ''}
      this.handleChange_email = this.handleChange_email.bind(this)
      this.handleChange_password = this.handleChange_password.bind(this) 
    }

    handleClick = () => {

      axios.post('http://kerenadiv.com:8005/login', {
        mail: this.state.email,

        password: this.state.password
        }).then(response => {

            //user is exist
            if(response.data.status) {
            if (typeof(Storage) !== "undefined") {
              localStorage.setItem("my_user", response.data.accessToken);
             } else {
              console.log("Sorry, your browser does not support Web Storage...")
             }
             console.log(this.props.history)
             window.location.href = "http://localhost:3000/home";
             //window.location.reload();
            }

            else {
              this.setState({errormessage:'You are not an account!'})
            }
          })
         
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
      // var isExist;
      // localStorage.getItem("my_user") ? isExist=true : isExist = false
      
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
