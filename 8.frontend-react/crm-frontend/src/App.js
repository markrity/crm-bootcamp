
// import './App.css';
import Form from './components/Form';
import AuthApi from './helpers/authApi';
import React, { useState } from 'react';
const authApi = new AuthApi();

function App() {

  const signup = {
    submitFunc: authApi.signup,
    type: 'signup',
    title: "Sign up",
    fields: {
      name: {
        text: "Full Name",
        id: "name"
      },
      mail: {
        text: "Email",
        id: "mail"
      },
      phone: {
        text: "Phone number",
        id: "phone"
      }, 
      business: {
        text: "Business Name",
        id: "Business"
      },
      password: {
        text: "Password",
        id: "password"
      }
    }
  }


  const signin = {
    submitFunc: authApi.signin,
    type: 'signin',
    title: "Sign In",
    fields: {
      mail: {
        text: "Email",
        id: "mail",
      },
      password: {
        text: "Password",
        id: "password"
      }
    }













  }
  

  const [isSignUp, setIsSignUp] = useState(true);  

  
  const changeMode = (e) => {
    if(e.target.id === "signin" && isSignUp){
      setIsSignUp(false);
    } else if(e.target.id === "signup" && !isSignUp){
      setIsSignUp(true);
    }
    return;
  };
  const jwtToken = localStorage.getItem('jwtToken');
  if(jwtToken){
    console.log("jwt token exist!!!!");
    return (
      <div>
        <button id="logout" onClick={()=>authApi.logout()}>Logout</button>
        home page
      </div>
    );
  }
  console.log("jwt token not found :(");
  return (
    <div className="App">
      <div>
        <button id="signin" onClick={(e)=>changeMode(e)}>Sign In</button>
        <button id="signup" onClick={(e)=>changeMode(e)}>Sign Up</button>
      </div>
      <Form 
      fields={isSignUp ? signup.fields : signin.fields} 
      title={isSignUp ? signup.title : signin.title}
      submitHandle={isSignUp ? signup.submitFunc : signin.submitFunc} 
      type={isSignUp ? signup.type : signin.type}
      />
      
    </div>
  );
}


export default App;
