import React from "react";
import { connect, useSelector } from "react-redux";
import { Redirect, Route, useHistory } from "react-router";

const AuthRoute = props => {
    const { path, type, component } = props
    const { isOnline, isLoading } = useSelector(state => state.auth);
    const history = useHistory()
    if (!isLoading) {
        if (type === "guest" && isOnline) {
            history.push("/home")

        } else if (type === "private" && !isOnline) {
            history.push("/auth/login")
        }
    }
    return <Route exact path={path} component={component} />;
};

export default AuthRoute;