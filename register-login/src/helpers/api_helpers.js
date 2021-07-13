
import axios from 'axios';
import {basicURL, basicURLPHP} from '../constans/constants.js'
import {addToLS} from '../helpers/local_storage_helper.js'



export async function connectToServerLogin(params) {
   const res =  await axios.post(basicURL+'/login',{...params})
   if(res.data.status) {
        localStorage.setItem("my_user", res.data.accessToken);
        localStorage.setItem("account_id", res.data.account_id);
        window.location.href = "http://localhost:3000/home";
        return true;
    }
    return false;
}


export async function connectToServerRegister(params) {
   const res =  await axios.post(basicURL+'/register',{...params})
   switch(res.data.status) {
        //user already exist
        case 0:  
            return {status: 'exist'}
        //ok
        case 1:  
            localStorage.setItem("my_user", res.data.accessToken);
            localStorage.setItem("account_id", res.data.account_id);
            window.location.href = "http://localhost:3000/home";
            break
        //invalid fields
        case 2: 
            return {status:'invalid', valid : res.data.valid}
   }
}

export async function connectToServerReset(params) {
   await axios.post(basicURL+'/reset',{...params})
}


export async function connectToServerChange(params) {
    const res =  await axios.post(basicURL+'/change',{...params})
    return res.data.status;
 }

export async function connectToServerPhpAdd(params, className) {

    const res =  await axios.post(basicURLPHP+'/'+className+'/add/',{...params})
    console.log(res);
    return res;
 }


 export async function connectToServerPhpDelete(params, className) {
    const res =  await axios.post(basicURLPHP+'/'+className+'/delete/',{...params})
    return res;
 }


 //not work
 export async function connectToServerPhpGetAll(params) {
    const res =  await axios.post(basicURLPHP+'/clients/getAll/',{...params})
    return res.data.clients;
 }



 export async function connectToServerPhpEdit(params, className) {
    const res =  await axios.post(basicURLPHP+'/'+className+'/edit/',{...params})
    return res;
 }

