import React, { useEffect } from 'react';
import auth from './Screens/authentication';
import additionInfo from './Screens/additionalInfo';
import resetPassword from './Screens/resetPassword';
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
    dispatch(checkAuth())
  }, [history])

  useEffect(() => {
    if (!isOnline)
      history.push('/auth')
  }, [isOnline, history])
  return (
    <Switch>
      <Route exact path='/' component={homePage} />
      <Route exact path='/auth' component={auth} />
      <Route exact path='/additionalInfo' component={additionInfo} />
      <Route exact path='/resetPassword' component={resetPassword} />
    </Switch>
  );
}


export default App;

