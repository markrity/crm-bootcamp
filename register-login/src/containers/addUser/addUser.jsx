import React, {useState} from "react";
import Button from '../../components/button'
import FormInput from'../../components/formInput'
import axios from 'axios';

function AddUser(props) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    function handleClick() {
       // setMessage('check your email...')
      //  console.log(email)
        var token = localStorage.getItem("my_user");
        axios.post('http://kerenadiv.com:8005/addUser', {
            mail: email,
            token: token
            }).then(response => {
                setMessage('we send mail to your new user!')
              })
        
    }

    function handleChange(event) {
        setMessage('')
        setEmail(event.target.value)
    }
    

    return (
    <div className="controller">
     <FormInput type = "text" className ="input" placeholder= "Enter user's mail" onChange={handleChange}/>
     <Button className="button" button_text="Send" onClick={handleClick} />
     {message}
    </div>
    );
}

export default AddUser;