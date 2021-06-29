import React, {useState} from "react";
import Button from '../../components/button'
import FormInput from'../../components/formInput'
import axios from 'axios';

function ChangePassword(props) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirm] = useState('');
    const [errorMessage, setMessage] = useState('');
    const [showChangeButton, setChangeButton] = useState(true);
    const [showLoginButton, setLoginButton] = useState(false);

    function handleClickPassword() {
        if (password===confirmPassword) {
        //TODO validation for new password
        axios.post('http://kerenadiv.com:8005/change', {
            mail: props.match.params.id,
            password:password
            }).then(response => {
                if(response.data.status) {
                    setChangeButton(false)
                    setLoginButton(true)
                    setMessage('Your password has been reset!')
                }
                else {
                    setMessage('This link is no longer available')
                }
                })
        }
        else {
            setMessage('no matching')
        }
    }

    function handleClickLogin() {
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
     {showChangeButton && <Button className="button" button_text="Change password" onClick={handleClickPassword} />}
     {showLoginButton && <Button className="button" button_text="Back to login" onClick={handleClickLogin} />}
    </div>
    );
}

export default ChangePassword;