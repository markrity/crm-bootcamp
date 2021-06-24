import logo from './logo.svg';
import './App.css';
import axios from 'axios';
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
   
    axios.get('http://localhost:8005/checkToken', {
      headers: {
        'token': token
      }
    })
    .then(function (response) {
        const tokenValidate=response.data.tokenValidate;
        alert(tokenValidate);
        return tokenValidate;
    })
    .catch(function (error) {
      console.log(error);
    });
    

  }

  return (
    
    <div className="App">
     <Router>
        <switch>
        <Route exact path='/'>
          <Redirect to='/homepage'/>
        </Route>

        <Route  path="/homepage">

              
              {checkTokenValidation()?< Login/>:<Redirect to='/signup'/>}
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
