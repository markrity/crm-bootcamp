import React, { useEffect } from 'react';
import AddNewBuisness from './Screens/addNewBuisness';
import additionInfo from './Screens/additionalInfo';
import resetPassword from './Screens/resetPassword';
import setNewPassword from './Screens/setNewPassword'
import Login from './Screens/login'
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './actions/auth'
import homePage from './Screens/homePage';
import { Route, Switch, useHistory } from 'react-router-dom';

import './App.css';
const App = () => {
  const dispatch = useDispatch();
  const isOnline = useSelector(state => state.auth.isOnline)
  const history = useHistory();
  useEffect(() => {
    // dispatch(checkAuth())
  }, [history])
  // useEffect(() => {
  //   if (!isOnline && window.location.pathname.split('/')[1] !== 'auth')
  //     history.push('auth/login')
  // }, [isOnline, history])
  return (
    <Switch>
      <Route exact path='/' component={homePage} />
      <Route exact path='/auth/login' component={Login} />
      <Route exact path='/auth/addNewBuisness' component={AddNewBuisness} />
      <Route exact path='/auth/additionalInfo' component={additionInfo} />
      <Route exact path='/auth/resetPassword' component={resetPassword} />
      <Route exact path='/auth/resetPassword/valid' component={setNewPassword} />
      <Route>
        <h1>NOT FOUND!</h1>
      </Route>
    </Switch>
  );
}


export default App;

