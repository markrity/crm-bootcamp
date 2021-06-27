
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

    async ping(){
        axios.post('http://rgb.com:8005/ping', {}, 
        {
            headers: {
                'Authorization': localStorage.getItem('jwtToken')
            }
        })
        .then(function (response) {
            console.log("the response is:", response);
        //    return response.data.valid;
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
          console.log("response: ", response.data)
          return response.data;
      })
      .catch(function (error) {
          console.log(error);
      });
    }

    async signup(data){
        const response = await axios.post('http://rgb.com:8005/signup', data);
        if(response){
            return response.data;
        }
        return null;
        
    }
}

export default AuthApi;
