import axios from 'axios';

function ping() {

    axios.post('http://kerenadiv.com:8005/ping', {
        }).then(function (response) {
           
        })

}

export default ping;