import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux'
import AddNewBuisness from './Screens/Auth/addNewBuisness';
import AdditionInfo from './Screens/Auth/additionalInfo';
import ResetPassword from './Screens/Auth/resetPassword';
import SetNewPassword from './Screens/Auth/setNewPassword'
import Employees from './Screens/employees';
import LoginPage from './Screens/Auth/login'
import EmployeeReg from './Screens/Auth/employeeRegistration';
import WorkSpace from './Screens/WorkSpace/workSpace';
import CreateEvent from './Screens/createEvent';
import { checkAuth } from './actions/auth'
import HomePage from './Screens/homePage';
import Verification from './Screens/Auth/verification';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthRoute from './Components/AuthRoute';
import './App.css';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkAuth())
  }, [])
  return (
    <Router>
      <Switch>
        <AuthRoute path="/home" type="private" component={HomePage} />
        <AuthRoute path="/auth/login" type="guest" component={LoginPage} />
        <AuthRoute path="/auth/addNewBuisness" type="guest" component={AddNewBuisness} />
        <AuthRoute path='/auth/additionalInfo' type="guest" component={AdditionInfo} />
        <AuthRoute path='/auth/resetPassword' type="guest" component={ResetPassword} />
        <AuthRoute path='/auth/resetPassword/valid' type="guest" component={SetNewPassword} />
        <AuthRoute path='/employees' type="private" component={Employees} />
        <AuthRoute path='/auth/newEmployee/valid' type="guest" component={EmployeeReg} />
        <AuthRoute path='/verification/valid' type="guest" component={Verification} />
        <AuthRoute path='/createEvent' type="private" component={CreateEvent} />
        <AuthRoute path='/workSpace' type="private" component={WorkSpace} />
        {/* <Route path="/" component={history.push('/home')} /> */}
        <Route>
          <h1>NOT FOUND!</h1>
        </Route>
      </Switch >
    </Router >
  );
}

export default App;


