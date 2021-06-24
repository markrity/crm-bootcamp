import React from "react";
import Header from '../../components/header'
 import Button from '../../components/button'
 import FormInput from'../../components/formInput'
import axios from 'axios';


class Login extends React.Component {

    constructor(props) {
      super(props);
      this.state = {email:'', password:''}
      this.handleChange_email = this.handleChange_email.bind(this)
      this.handleChange_password = this.handleChange_password.bind(this)
    }

    handleClick() {
      axios.post('http://kerenadiv.com:8005/login', {
        mail: this.state.email,
        password: this.state.password
        }).then(function (response) {
            console.log(response.data.status);
            
            if (typeof(Storage) !== "undefined") {
             localStorage.setItem("my_user", response.data.accessToken);
            
             //console.log(localStorage.getItem("my_user"));
            } else {
             console.log("Sorry, your browser does not support Web Storage...")
            }
            if(response.data.status){
            window.location.href = "http://localhost:3000/home";
            }
          })
    } 

    handleChange_email(event) {
      this.setState({email: event.target.value});
    }

    handleChange_password(event) {
      this.setState({password: event.target.value});
    }

    render() {
      return (
        <div>

        <Header header_text = "Login"/>
        <FormInput label = "Email" type = "text" className ="register" placeholder= "Email" onChange={this.handleChange_email} />
        <FormInput label = "Password" type = "text" className ="register" placeholder= "Password" onChange={this.handleChange_password} />
        <Button button_text="Login" onClick={() => this.handleClick()} />

        </div>
      );
    }
  
  }

  export default Login;
