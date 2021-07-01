import React from 'react'
import Auth from '../Components/authentication'
import { withRouter } from "react-router";


const Login = () => (
    <Auth initMode="Login" />

)

export default withRouter(Login);
