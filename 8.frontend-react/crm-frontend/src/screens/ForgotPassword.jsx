import Form from '../components/Form';
import Logo from '../components/Logo';
import AuthApi from '../helpers/authApi';
// import '../styles/massageBox.css';
import '../styles/massageBox.css';
import {
    Link,
  } from "react-router-dom";
  import React, { useState, useEffect , usePrevious} from 'react';

const authApi = new AuthApi();

function ForgotPassword(props) {  

      const [isFormSubmitted, setFormSubmitted] = useState(false);

      const submit = async (data) => {
        const res = await authApi.forgotPassword(data);
        console.log(res.valid);
        if(res.valid){
          console.log("valid!");
          setFormSubmitted(true);
        } else {
          return res;
        }
      }


      const forgot = {
        submitFunc: submit,
        type: 'forgot',
        title: "Forgot Password",
        errorMap: {
          'serverError': 'Try again later',
        },
        buttonTitle: 'Reset My Password',
        buttonClass: 'main-button',
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
        <div className='box-wrapper'>
            <div className='logo'> 
                <Logo size='small'/>
            </div>
            <div className={formClasses}>
              {isFormSubmitted ? 
              <div className='successful-operation'>
              <h2>Link to reset your password sent to your mail!</h2>
              <Link className='linkto' to="/login">Go to login</Link>
            </div>
              : <div className='form-box'>
              <Form 
                  className='form-body'
                //  fields={forgot.fields} 
                //  title={forgot.title}
                  submitHandle={forgot.submitFunc} 
                 // type={forgot.type}
                  errorMap={forgot.errorMap}
                 button= {forgot.buttonTitle}
                //  buttonClass={forgot.buttonClass}
                  {...forgot}
              />
              <hr/>
              <div className='links'>
                  <Link className='linkto' to="/signup">Create new account</Link>
                  <Link className='linkto' to="/login">Back to login</Link>
              </div>
              </div>
              }
            </div>
        </div>
    );
}

export default ForgotPassword;