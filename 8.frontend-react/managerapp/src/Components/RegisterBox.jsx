import React from 'react';
import './css/box-style.css'
import Label from './Label';
import Input from './Input';
import Button from './Button';

function RegisterBox(props) {
    return (
        <div className="login-register">
            
            <Label inputName="FullName" labelValue="Full name"/>
            <Input inputType="text" inputName="FullName" />
            <Label inputName="email" labelValue="Email"/>
            <Input inputType="email" inputName="email" />
            <Label inputName="password" labelValue="Password"/>
            <Input inputType="password" inputName="password" />
            <Label inputName="confirmPassword" labelValue="Confirm password"/>
            <Input inputType="password" inputName="confirmPassword" />
            <Button buttonType="submit" buttonText="Sign up"/>
        </div>
    );
}

export default RegisterBox;