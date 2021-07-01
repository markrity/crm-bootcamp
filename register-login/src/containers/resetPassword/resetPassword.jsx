import React, {useState} from "react";
import Button from '../../components/button'
import FormInput from'../../components/formInput'
import axios from 'axios';

function ResetPassword(props) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    function handleClick() {
       // setMessage('check your email...')
        console.log(email)
        axios.post('http://kerenadiv.com:8005/reset', {
            mail: email
            }).then(response => {
                setMessage('check your mail......')
              })
        
    }

    function handleChange_email(event) {
        setMessage('')
        setEmail(event.target.value)
    }
    

    return (
    <body>
    <div className="test_login">
    <div className="controller">
     <FormInput type = "text" className ="input" placeholder= "Enter your email" onChange={handleChange_email}/>
     <Button className="button" button_text="Reset password" onClick={handleClick} />
     {message}
    </div>
    </div>
    </body>
    );
}

export default ResetPassword;