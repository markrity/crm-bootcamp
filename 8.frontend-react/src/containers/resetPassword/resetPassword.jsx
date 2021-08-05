import React, {useState} from "react";
import Button from '../../components/button'
import FormInput from'../../components/formInput'
import { connectToServerReset } from '../../helpers/api_helpers';
import axios from 'axios';

function ResetPassword(props) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleClick = async ()  => {
        const params = {mail: email}
        await connectToServerReset(params)
        setMessage('We have e-mailed your password reset link!')
    } 

    function handleChange_email(event) {
        setMessage('')
        setEmail(event.target.value)
    }
    

    return (
    <body>
    <div className="test_login">
    <div className="controller">
     <FormInput label_class="label" type = "text" className ="input" placeholder= "Enter your email" onChange={handleChange_email}/>
     <Button className="button" button_text="Reset password" onClick={handleClick} />
     {message}
    </div>
    </div>
    </body>
    );
}

export default ResetPassword;