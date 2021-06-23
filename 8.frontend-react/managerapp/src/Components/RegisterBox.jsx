import React, { useState } from 'react';
import axios from 'axios'
import Label from './Label';
import Input from './Input';
import Button from './Button';
import './css/box-style.css'
import './css/input-style.css'

function RegisterBox(props) {

   
    const saveDetailsOnDatabase=(e)=>{
        e.preventDefault();
        const fullName=e.target.elements.fullName.value.trim();
        const companyName=e.target.elements.companyName.value.trim();
        const phoneNumber=e.target.elements.phoneNumber.value.trim();
        const email=e.target.elements.email.value.trim();
        const password=e.target.elements.password.value.trim();
        let emailExists=false;
        axios.post('http://localhost:8005/register',{fullName,companyName,phoneNumber,email,password})
        .then(function (response) {
           emailExists=response.data.emailExists;
           console.log(emailExists);
           if(!emailExists){
             
             props.regMsg("Registration successful");
             props.msgColor('#D4EDDA');
            }
            else{
                
               props.regMsg("the username already exists!");
               props.msgColor('#F8D7DA');
             }
        })

        .catch(function (error) {
          console.log(error);
        });
    

    }

    return (
        <form className="login-register register" onSubmit={saveDetailsOnDatabase}>

            <div className="inputContainer">
                <Label inputName="fullName" labelValue="Full name"/>
                <Input inputType="text" inputName="fullName" />
            </div>

            <div className="inputContainer">
                <Label inputName="companyName" labelValue="Company name"/>
                <Input inputType="text" inputName="companyName" />
            </div>

            <div className="inputContainer">
                <Label inputName="phoneNumber" labelValue="Phone number"/>
                <Input inputType="text" inputName="phoneNumber" />
            </div>

            <div className="inputContainer">
                <Label inputName="email" labelValue="Email"/>
                <Input inputType="email" inputName="email" />
            </div>

            <div className="inputContainer">
                <Label inputName="password" labelValue="Password"/>
                <Input inputType="password" inputName="password" />
            </div>

            <div className="inputContainer">
                <Label inputName="confirmPassword" labelValue="Confirm password"/>
                <Input inputType="password" inputName="confirmPassword" />
            </div>

            <Button buttonText="Sign up" />

            
        </form>
    );
}

export default RegisterBox;