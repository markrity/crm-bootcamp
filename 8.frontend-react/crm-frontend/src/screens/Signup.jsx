import React from 'react';
import Form from '../components/Form';
import Logo from '../components/Logo';
import AuthApi from '../helpers/authApi';
import '../styles/signUp.css';
import {
    // BrowserRouter as Router,
    Link,
  } from "react-router-dom";
const authApi = new AuthApi();



function Signup(props) {

  const submit = async (data) => {

    const res = await authApi.signup(data);
    console.log(res.valid);
    if(res.valid){
      console.log("signup is done!!",res.valid);
      window.location.href = "http://localhost:3000/home";
    } else {
      return res.errors;
    }
    // return the backend result
  }

    const signup = {
        submitFunc: submit,
        type: 'signup',
        title: "Let's get started!",
        buttonTitle: "SIGN UP",
        fields: {
          name: {
            text: "Full Name",
            id: "name",
            type: 'text',
            error: false,
            mainType: 'name'
          },
          mail: {
            text: "Email",
            id: "mail",
            type: 'text',
            error: false,
            mainType: 'mail'
          },
          phone: {
            text: "Phone Number",
            id: "phone",
            type: 'text',
            error: false,
            mainType: 'phone'
          }, 
          business: {
            text: "Business Name",
            id: "business",
            type: 'text',
            error: false,
            mainType: 'name'
          },
          password: {
            text: "Password",
            id: "password",
            type: "password",
            error: false,
            mainType: 'password'
          }
        }
      }
    

    return (
      <div className='wrapper'>
          <div className='text-container'> 
          <Logo size='large'/>
            <h2>Be the best graphic designer you can</h2>
          </div>
          <div className='form-container'>
              <Form 
              className='form-body'
              fields={signup.fields} 
              title={signup.title}
              submitHandle={signup.submitFunc} 
              type={signup.type}
              button={signup.buttonTitle}
              />
              <hr></hr>
              <Link className='linkto' to="/login">I already have an account</Link>
          </div>
      </div>
    );
}

export default Signup;