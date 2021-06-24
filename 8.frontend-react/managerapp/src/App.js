import logo from './logo.svg';
import './App.css';

import Signup from './Pages/Signup';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound/NotFound.component';
import {

  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";

function App() {
  const checkTokenValidation=()=>{
    const token=localStorage.getItem("token");

  }

  return (
    
    <div className="App">
     <Router>
        <switch>
        <Route path='/'>
          <Redirect to='/homepage'/>
        </Route>

        <Route  path="/homepage">
              {localStorage.getItem("token")?< Login/>:<Redirect to='/signup'/>}
          </Route>

          <Route path="/signup">
            <Signup/>
          </Route>
          
          {/* <Route path='/'>
            <NotFound/>
          </Route> */}

        </switch>
     </Router>
     
    

    

    </div>
  );
}

export default App;
