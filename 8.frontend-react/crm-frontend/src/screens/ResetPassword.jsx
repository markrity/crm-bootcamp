import Form from '../components/Form';
import Logo from '../components/Logo';
import AuthApi from '../helpers/authApi';
// import '../styles/login.css';
import '../styles/massageBox.css';
import {
    Link, useParams,
  } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const authApi = new AuthApi();

function ResetPassword(props) {  

      const [isPasswordChanged, setPasswordChanged] = useState(false);

      const {mail} = useParams();
      if(!mail){
        this.props.history.push('/login');
      }
      const submit = async (data) => {
        // sending the mail token with the new password
        const res = await authApi.resetPassword({mailToken: mail, fields: data});
        if(res.valid){
          console.log("password was changed");
          setPasswordChanged(true);
          return null;
        } 
        return res;
      }

      const reset = {
        submitFunc: submit,
        type: 'reset',
        title: "Enter a new password",
        buttonTitle:'Change Password',
        buttonClass: 'main-button',
        errorMap: {
          'serverError': 'Try again later',
        },
        fields: {
          newPassword: {
            text: "Password",
            id: "newPassword",
            error: false,
            mainType: 'password'
          },
          // confirmPassword: {
          //   text: "Confirm New Password",
          //   id: "confirmPassword",
          //   error: false,
          //   mainType: 'password'
          // }
        }
      }

      var formClasses = 'form-container login small';
    

    return (
        <div className='box-wrapper'>
            <div className='logo'> 
                <Logo size='small'/>
            </div>
            <div className={formClasses}>
              {isPasswordChanged ? 
              <div className='successful-operation'>
                <h2>Password changed!</h2>
                <Link className='linkto' to="/login">Go to log in</Link>
              </div> : 
              <Form 
                    className='form-body'
                    fields={reset.fields} 
                    title={reset.title}
                    submitHandle={reset.submitFunc} 
                    type={reset.type}
                    errorMap = {reset.errorMap}
                    button={reset.buttonTitle}
                    buttonClass={reset.buttonClass}
                /> 
                }
                
            </div>
        </div>
    );
}

export default ResetPassword;