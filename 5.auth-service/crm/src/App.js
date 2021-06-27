import React, { useState, useEffect } from 'react';
import auth from './Screens/authentication';
import additionInfo from './Screens/additionalInfo';
import resetPassword from './Screens/resetPassword';
import axios from 'axios'
import { connect, useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './actions/auth'
import homePage from './Screens/homePage';
import { BrowserRouter as Router, Route, Switch, Link, Redirect, useHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';
function App() {
  const dispatch = useDispatch();
  const isOnline = useSelector(state => state.auth.isOnline)
  const history = useHistory();
  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  useEffect(() => {
    if (!isOnline)
      history.push('/auth')
  }, [isOnline])
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

