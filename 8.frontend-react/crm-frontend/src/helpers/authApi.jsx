
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
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    async ping(){
        const response = await axios.get('http://rgb.com:8005/ping', 
        {
            headers: {
                'authorization': localStorage.getItem('jwtToken')
            }
        })
        console.log(response)
        if(response){
            return response.data;
        }
        else {
            return false;
        }
    }

    async signin(data) {
        const response = await axios.post('http://rgb.com:8005/login', data);
        
        if(response){
            const token  = response.data.accessToken;
            if(response.data.valid && token){
                localStorage.setItem('jwtToken', token);
            }
            return response.data;
        }
        return null;
    }

    async signup(data){
        const response = await axios.post('http://rgb.com:8005/signup', data);
        if(response){
            const token  = response.data.accessToken;
            if(response.data.valid && token){
                localStorage.setItem('jwtToken', token);
            }
            return response.data;
        }
        return null;
        
    }
}

export default AuthApi;
