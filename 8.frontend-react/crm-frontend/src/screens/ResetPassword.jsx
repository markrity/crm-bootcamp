import React from 'react';
import Form from '../components/Form';
import Logo from '../components/Logo';
import AuthApi from '../helpers/authApi';
import '../styles/login.css';
import {
    Link,
  } from "react-router-dom";

const authApi = new AuthApi();

function ResetPassword(props) {  

      const submit = async (data) => {
          console.log('reset password submitted');
        //   move to home or login


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

      const reset = {
        submitFunc: submit,
        type: 'reset',
        title: "Your password has been reset!",
        buttonTitle:'Change Password',
        fields: {
          newPassword: {
            text: "New Password",
            id: "newPassword",
            error: false,
            mainType: 'password'
          },
          confirmPassword: {
            text: "Confirm New Password",
            id: "confirmPassword",
            error: false,
            mainType: 'password'
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
                    fields={reset.fields} 
                    title={reset.title}
                    submitHandle={reset.submitFunc} 
                    type={reset.type}
                    button={reset.buttonTitle}
                />
            </div>
        </div>
    );
}

export default ResetPassword;