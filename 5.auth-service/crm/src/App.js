import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux'
import AddNewBuisness from './Screens/addNewBuisness';
import AdditionInfo from './Screens/additionalInfo';
import ResetPassword from './Screens/resetPassword';
import SetNewPassword from './Screens/setNewPassword'
import Employees from './Screens/employees';
import LoginPage from './Screens/login'
import EmailSent from './Screens/emailSent'
import EmployeeReg from './Screens/employeeRegistration';
import { checkAuth } from './actions/auth'
import HomePage from './Screens/homePage';
import Verification from './Screens/verification';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import AuthRoute from './Components/AuthRoute';
import './App.css';
const App = () => {
  const dispatch = useDispatch()
  const { isOnline } = useSelector(state => state.auth)
  const history = useHistory()
  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  return (
    <Router>
      <Switch>
        <AuthRoute path="/auth/login" type="guest" component={LoginPage} />
        <AuthRoute path="/home" type="private" component={HomePage} />
        <AuthRoute path="/auth/addNewBuisness" type="guest" component={AddNewBuisness} />
        <AuthRoute path='/auth/additionalInfo' type="guest" component={AdditionInfo} />
        <AuthRoute path='/auth/resetPassword' type="guest" component={ResetPassword} />
        <AuthRoute path='/auth/resetPassword/valid' type="guest" component={SetNewPassword} />
        <AuthRoute path='/employees' type="private" component={Employees} />
        <AuthRoute path='/auth/emailSent' type="guest" component={EmailSent} />
        <AuthRoute path='/auth/newEmployee/valid' type="guest" component={EmployeeReg} />
        <AuthRoute path='/verification/valid' type="guest" component={Verification} />
        {/* <Route path="/" component={history.push('/home')} /> */}
        <Route>
          <h1>NOT FOUND!</h1>
        </Route>
      </Switch >
    </Router >
  );
}


export default App;


