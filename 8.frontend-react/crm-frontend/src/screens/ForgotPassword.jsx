import React from 'react';
import Form from '../components/Form';
import Logo from '../components/Logo';
import AuthApi from '../helpers/authApi';
import '../styles/login.css';
import {
    Link,
  } from "react-router-dom";

const authApi = new AuthApi();

function ForgotPassword(props) {  

      const submit = async (data) => {
          console.log('mail submitted to reset password');
        //   send mail to the user

        // const res = await authApi.signin(data);
        // console.log(res.valid);
        // if(res.valid){
        //   console.log("login is done!!",res.valid);
        //   window.location.href = "http://localhost:3000/home";
        // } else {
        //   return res.errors;
        // }
        // // return the backend result
      }

      const forgot = {
        submitFunc: submit,
        type: 'forgot',
        title: "Forgot Password",
        buttonTitle:'Reset My Password',
        fields: {
          mail: {
            text: "Enter Your Email",
            id: "mail",
            error: false,
            mainType: 'mail'
          }
        }
      }

      var formClasses = 'form-container login small';
    

    return (
        <div>
            <div className='logo'> 
                <Logo size='small'/>
            </div>
            <div className={formClasses}>
                <Form 
                    className='form-body'
                    fields={forgot.fields} 
                    title={forgot.title}
                    submitHandle={forgot.submitFunc} 
                    type={forgot.type}
                    button={forgot.buttonTitle}
                />
                <div className='links'>
                    <Link className='linkto' to="/signup">Create new account</Link>
                    <Link className='linkto' to="/login">Back to login</Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;