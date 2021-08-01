import React, { useState, useEffect } from 'react';
import Home from './screens/Home';
import ResetPassword from './screens/ResetPassword';
import ForgotPassword from './screens/ForgotPassword';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Team from './screens/Team';
import AuthApi from './helpers/authApi';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Clients from './screens/Clients';
import AddProject from './screens/AddProject';
import Loader from "react-loader-spinner";
import './styles/styles.scss';
import './components/loading/Loading'
import AllProjects from './screens/AllProjects';
import Header from './components/header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Loading from './components/loading/Loading';

const authApi = new AuthApi();
function App() {

  const [isConnect, setConnection] = useState(false);
  const [isLoading, setLoading] = useState(true);

  
    useEffect(() => {
      async function checkConnection() {
        if(localStorage.getItem('jwtToken')){
          const isUserAuthenticated = await authApi.ping();
          setConnection(isUserAuthenticated);
          setLoading(false);
        } else {
          setLoading(false);
          setConnection(false);
          
        }
      }
      checkConnection();
  }, [])

  const loader = <Loading color="#fe5f55" width={100} height={100}/>
  

  return (
    <Router>
    <div className="App">
      {isLoading ? loader : 
      <Switch>
      <Route
          exact path="/"
          render={() => {
              return ( 
                isConnect ?
                <Redirect to="/home" /> :
                <Redirect to="/signup" /> 
              )
          }}
        />
        <Route 
           path="/signup">
            {
            isLoading ? loader 
            : isConnect ?
                <Redirect to="/home" /> :
                <Signup type='newAccount' /> 
            }
          </Route>
       
        <Route 
           exact path="/newUser/:token">
            {isLoading ? loader : 
              <Signup type='newUser'/> 
            }
        </Route>
        <Route exact path="/home">
            {
            isConnect ?
            <Home /> :
            <Redirect to="/login" /> 
            }
        </Route>
        <Route exact path="/login"
        // render={(props) => <Login {...props} /> }
        >
          {isLoading ? loader
        :(isConnect ? <Redirect to="/home" />  : <Login/>)}
        </Route>
        
        <Route path="/resetPassword/:mail">
            <ResetPassword/>
        </Route >
        <Route exact path="/forgotPassword">
            <ForgotPassword/>
        </Route >
        <Route exact path="/team">
        {isLoading ? loader: 
            isConnect ?
                <Team /> : <Redirect to="/login" /> 
            }
        </Route> 
        <Route exact path="/allProjects">
        {isLoading ? loader: 
            isConnect ?
                <AllProjects mine={false}/> : <Redirect to="/login" /> 
            }
        </Route> 
        <Route exact path="/myProjects">
        {isLoading ? loader: 
            isConnect ?
                <AllProjects mine={true} /> : <Redirect to="/login" /> 
            }
        </Route> 
        <Route exact path="/clients">
        {isLoading ? loader: 
            isConnect ?
                <Clients/> : <Redirect to="/login" /> 
            }
        </Route>
        <Route exact path="/addProject">
        {isLoading ? loader: 
            isConnect ?
                <AddProject/> : <Redirect to="/login" /> 
            }
        </Route>
      </Switch>}
    </div>
  </Router>
  );
}


export default App;


// const getLogoutRoutes = () =>{
//   return [
//     <Route 
//       path="/signup"
//       render={(props) => <Signup type='newAccount' {...props} /> }
//     />,
//     <Route 
//       path="/resetPassword/:mail"
//       component={ResetPassword}
//     />,
//     <Route 
//       exact path="/forgotPassword"
//       component={ForgotPassword}
//     />,
//     <Route 
//       exact path="/login"
//       render={(props) => <Login {...props} /> }
//     />,
//     <Route 
//          exact path="/newUser/:token"
//          render={(props) => <Signup type='newUser' {...props} /> }
//     />,
//     <Route 
//       component={<Redirect to="/login"/>}
//     />
//   ];
// }

// const getLoginRoutes = () => {
//   return [
//     <Route 
//       exact path="/home"
//       component={Home}
//     />,
//     <Route 
//       exact path="/team"
//       component={Team}
//     />,
//     <Route>
//       <Redirect to="/home"/>
//     </Route>
//   ];
// }
// console.log(isLoading, isConnect);
// return (
//   <Router>
//   <div className="App">
//     <Switch>
//       {
//         isLoading ? 
//         <div/> : 
//         isConnect ? 
//         getLoginRoutes() :
//         getLogoutRoutes()
//       }
//     </Switch>
//   </div>
// </Router>
// );