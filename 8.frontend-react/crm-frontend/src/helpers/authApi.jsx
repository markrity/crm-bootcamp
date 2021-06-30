
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

    async editUser(data){
        const response = await axios.post('http://rgb.com:8005/editUser', data);
        if(response){
            const token  = response.data.accessToken;
            if(response.data.valid && token){
                localStorage.setItem('jwtToken', token);
            }
            return response.data;
        }
        return null; 
    }


    /**
 * 
 {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Inl1dmFsIGNvaGVuIiwidXNlcklkIjo2NywiYWNjb3VudElkIjoxMTIsInNlc3Npb25faWQiOjAsImlhdCI6MTYyNDk3NzM4OCwiZXhwIjoxNjI1ODQxMzg4fQ.M4CLz107Pfery9dnBeLp_W23OBIQdK2OEEjVA93aVOo",
    "fields": {
        "mail": {
            "type": "mail",
            "value" : "yuval.halamish@workiz.com"
        }
    }
}
 */

    async newUser(data){
        const token = localStorage.getItem('jwtToken');
        const response = await axios.post('http://rgb.com:8005/addUser', {token: token, fields: data});
        if(response) {
            return response.data;
        }
        return null; 
    }

    async forgotPassword(data){
        const response = await axios.post('http://rgb.com:8005/forgotPassword', data);
        // TODO catch the error and check if response isn't null
        return response.data;
    }

    async resetPassword(data){
        const response = await axios.post('http://rgb.com:8005/resetPassword', data).catch((err)=>{});
        // TODO catch the error and check if response isn't null
        return response.data;
    }
}


// const response = await axios.get('http://rgb.com:8005/ping', 
//         {
//             headers: {
//                 'authorization': localStorage.getItem('jwtToken')
//             }
//         })
//         console.log(response)
//         if(response){
//             return response.data;
//         }
//         else {
//             return false;
//         }
export default AuthApi;
