
const axios = require('axios');

class AuthApi {

    logout(){
        axios.post('http://rgb.com:8005/logout', {}, 
        {
            headers: {
                'Authorization': localStorage.getItem('jwtToken')
            }
        })
        .then(function (response) {
            localStorage.removeItem('jwtToken');
            window.location.href = "http://localhost:3000/signup";
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    signin(data) {
        axios.post('http://rgb.com:8005/login', data)
      .then(function (response) {
          const token  = response.data.accessToken;
          if(token){
            localStorage.setItem('jwtToken', response.data.accessToken);
          }
      })
      .catch(function (error) {
          console.log(error);
      });
    }

    signup(data){
        axios.post('http://rgb.com:8005/signup', data)
      .then(function (response) {
          const token  = response.data.accessToken;
          if(token){
            localStorage.setItem('jwtToken', response.data.accessToken);
          }
          if(response.data.valid){
            window.location.href = "http://localhost:3000/home";;
          }
      })
      .catch(function (error) {
          console.log(error);
      });
    }
}

export default AuthApi;
