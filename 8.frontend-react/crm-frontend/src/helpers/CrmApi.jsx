import axios from 'axios';

class CrmApi {

    constructor(){
        this.basicUrl = 'http://localhost:9991';
    }

    async getAllProject(isUser){
        const response = await axios.post(`${this.basicUrl}/projects/getAllProjects/`, {user: isUser, token: localStorage.getItem('jwtToken')});

        if(response){
            return response;
        }
        else {
            return false;
        }
    }

    async getAllClients(){
        const response = await axios.post(`${this.basicUrl}/clients/getAllClients/`, {token: localStorage.getItem('jwtToken')});

        if(response){
            return response;
        }
        else {
            return false;
        }
    }
}

export default CrmApi;