//import './App.css';
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false
    };
  }

  showLogin() {
    this.setState({isLoginOpen: true,  isRegisterOpen: false})
  }

  showRegister() {
    this.setState({isLoginOpen: false,  isRegisterOpen: true})
  }

  render() {
    return (
      <div className="root-container">
          <div className="box-controller"> 
             <div className="controller" onClick={this.showLogin.bind(this)}>
               Login
            </div>
            <div className="controller" onClick={this.showRegister.bind(this)}>
               Register
               </div>
          </div>
          
          <div className="box-container">
               {this.state.isLoginOpen && <LoginBox />}
               {this.state.isRegisterOpen && <RegisterBox />}
          </div>
         
      </div>
    );
  }
}

class LoginBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isLoginOpen: true, isRegisterOpen: false};
  }

  submitLogin(e) {}

  render() {
    return (
      <div className="inner-container">
        <div className="header">
          Login
        </div>
        <div className="box">

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"/>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"/>
          </div>

          <button
            type="button"
            className="login-btn"
            onClick={this
            .submitLogin
            .bind(this)}>Login</button>
        </div>
      </div>
    );
  }

}

class RegisterBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isLoginOpen: false, isRegisterOpen: true};
  }

  submitRegister(e) {}

  render() {
    return (
      <div className="inner-container">
        <div className="header">
          Register
        </div>
        <div className="box">

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"/>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"/>
          </div>

          <button
            type="button"
            className="login-btn"
            onClick={this
            .submitRegister
            .bind(this)}>Login</button>
        </div>
      </div>
    );
  }

}


export default App;