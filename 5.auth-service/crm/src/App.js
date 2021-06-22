import auth from './Screens/authentication';
import homePage from './Screens/homePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={homePage} />
        <Route exact path='/auth' component={auth} />
      </Switch>
    </Router>
  );
}

export default App;
