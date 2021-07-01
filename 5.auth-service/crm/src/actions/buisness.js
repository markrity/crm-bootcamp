import axios from 'axios';



axios.defaults.withCredentials = true


export const getEmployees = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:8000/getEmployees', {}, { withCredentials: true })
    } catch {
        console.log("Unable to logout")
    }
}

