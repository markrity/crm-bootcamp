import React from "react";
import { connect, useSelector } from "react-redux";
import { Redirect, Route, useHistory } from "react-router";

const AuthRoute = props => {
    const { path, type, component } = props
    const { isOnline } = useSelector(state => state.auth);
    const history = useHistory()
    if (type === "guest" && isOnline) {
        history.push("/home")

    } else if (type === "private" && !isOnline) {
        history.push("/auth/login")
    }
    return <Route exact path={path} component={component} />;
};

const mapStateToProps = (state) => ({
    isOnline: state.auth.isOnline,
    user: state.auth.user
});

export default connect(mapStateToProps)(AuthRoute);