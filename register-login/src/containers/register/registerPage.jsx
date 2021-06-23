import React from "react";
import Header from '../../components/header'
 import Button from '../../components/button'
 import FormInput from'../../components/formInput'
import axios from 'axios';


class Register extends React.Component {

    constructor(props) {
      super(props);
      this.state = {full_name:'', business_name:'', phone:'', email:'', password:''}
      this.handleChange = this.handleChange.bind(this)
      this.handleChange_business = this.handleChange_business.bind(this)
      this.handleChange_phone = this.handleChange_phone.bind(this)
      this.handleChange_email = this.handleChange_email.bind(this)
      this.handleChange_password = this.handleChange_password.bind(this)
    }

    handleClick() {
      axios.post('http://kerenadiv.com:8005/register', {
        full_name: this.state.full_name,
        business_name: this.state.business_name,
        mail: this.state.email,
        phone: this.state.phone,
        password: this.state.password
        }).then(function (response) {
          if (typeof(Storage) !== "undefined") {
           localStorage.setItem("my_user", response.data.accessToken);
        
           console.log(localStorage.getItem("my_user"));
          } else {
           console.log("Sorry, your browser does not support Web Storage...")
          }
        })
     // console.log(this.state)
    }

    handleChange(event) {
     this.setState({full_name: event.target.value});
     
    }

    handleChange_business(event) {
    this.setState({business_name: event.target.value});
    }

    handleChange_phone(event) {
    this.setState({phone: event.target.value});
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
        
        <Header header_text = "Sign Up"/>
        <FormInput label = "Full Name" type = "text" className ="register" placeholder= "full name"  onChange={this.handleChange} />
        <FormInput label = "Business Name" type = "text" className ="register" placeholder= "business name" onChange={this.handleChange_business}/>
        <FormInput label = "Email" type = "text" className ="register" placeholder= "Email" onChange={this.handleChange_email} />
        <FormInput label = "Phone" type = "text" className ="register" placeholder= "phone" onChange={this.handleChange_phone} />
        <FormInput label = "Password" type = "text" className ="register" placeholder= "Password" onChange={this.handleChange_password} />

        <Button button_text="Sign Up" onClick={() => this.handleClick()} />

        </div>
      );
    }
  
  }

  export default Register;
