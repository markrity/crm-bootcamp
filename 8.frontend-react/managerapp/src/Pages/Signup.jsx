import React, { useState } from 'react';
import './css/signup-style.css'
import LoginBox from '../Components/LoginBox';
import RegisterBox from '../Components/RegisterBox';
import Button from '../Components/Button';
import ChoiceContainer from '../Components/ChoiceContainer';

function Signup(props) {
    const [isLogin, setIsLogin] = useState(true);
    const [isRegister, setIsRegister]=useState(false);
  
    const showLoginBox=()=>{
        setIsLogin(true);
        setIsRegister(false);
    }


    const showRegisterBox=()=>{
        setIsLogin(false);
        setIsRegister(true);
    }
    return (

           <div className="signup">
               <div className="mainContainer">
             <ChoiceContainer showLogBox={showLoginBox} showRegBox={showRegisterBox}/>

               {isLogin && <LoginBox/>}
                {isRegister && <RegisterBox/>}
                </div>
            </div>
    );
}

export default Signup;