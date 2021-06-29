import React, {useState} from "react";
import Button from '../../components/button'
import FormInput from'../../components/formInput'
import axios from 'axios';

function ChangePassword(props) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirm] = useState('');
    const [errorMessage, setMessage] = useState('');


    function handleClickPassword() {
        //update the new password in the db 
        if (password===confirmPassword) {
            //validation
        axios.post('http://kerenadiv.com:8005/change', {
            mail: props.match.params.id,
            password:password
            }).then(response => {
    
                if(response.data.status) {
                    setMessage('Your password has been reset!')
                }
    
                else {
                    setMessage('You are not an account!')
                }
                })
        }
        else {
            setMessage('no matching')
        }
    }

    function handleClickLogin() {

        // const urlSearchParams = new URLSearchParams(window.location.search);
        // // const params = Object.fromEntries(urlSearchParams.entries());
        // console.log(props.match.params.id)
        //console.log(password)
       window.location.href = "http://localhost:3000/login";

    }

    function handleChange(event) {
        setMessage('')
        setPassword(event.target.value)
    }
    function handleChangeConfirm(event) {
        setMessage('')
        setConfirm(event.target.value)
    }
    return (
    <div className="controller">
     {errorMessage}
     <FormInput type = "text" className ="input" placeholder= "Enter new password" onChange={handleChange}/>
     <FormInput type = "text" className ="input" placeholder= "Confirm new password" onChange={handleChangeConfirm}/>
     <Button className="button" button_text="Change password" onClick={handleClickPassword} />
     <Button className="button" button_text="Back to login" onClick={handleClickLogin} />
    </div>
    );
}

export default ChangePassword;