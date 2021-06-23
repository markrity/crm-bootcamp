import React, { useState } from 'react';
import './css/signup-style.css'
import LoginBox from '../Components/LoginBox';
import RegisterBox from '../Components/RegisterBox';
import Button from '../Components/Button';
import ChoiceContainer from '../Components/ChoiceContainer';
import Message from '../Components/message';

function Signup(props) {

    const [isLogin, setIsLogin] = useState(true);
    const [registerMsg,setRegisterMsg]=useState('');
    const [messageColor,setMsgColor]=useState('');
    const showLoginBox=()=>{
        setIsLogin(true);
    }

    const showRegisterBox=()=>{
        setIsLogin(false);
    }

    const showMsg=(msg)=>{
       setRegisterMsg(msg);
    }

    const changeMsgColor=(color)=>{
        setMsgColor(color)
    }

    return (

           <div className="signup">
                {registerMsg?<Message  msgContent={registerMsg} msgColor={messageColor}/>:null}
               <div className="mainContainer">
             <ChoiceContainer showLogBox={showLoginBox} showRegBox={showRegisterBox}/>
               {isLogin ? <LoginBox/>: <RegisterBox msgColor={changeMsgColor} regMsg={showMsg}/>}
                </div>
            </div>
    );
}

export default Signup;