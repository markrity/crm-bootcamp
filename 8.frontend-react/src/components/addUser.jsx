import React, {useState} from "react";
import Button from './button'
import FormInput from './formInput'
import axios from 'axios';
import Modal from 'react-modal';
import '../style/button.css'
function AddUser(props) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    function handleClick() {
        var token = localStorage.getItem("my_user");
        axios.post('http://kerenadiv.com:8005/addUser', {
            mail: email,
            token: token
            }).then(response => {
                if (response.data.status === 1) {
                  setMessage('we send mail to your new user!')
                }
                else {
                  setMessage('user already exist!')
                }
              })    
    }

    function handleChange(event) {
        setMessage('')
        setEmail(event.target.value)
    }
    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          width                 : '30%',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };
   
    return (
    <Modal 
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
    >
      
        <Button className="close" button_text="X" onClick={props.closeModal} />
        <FormInput type = "text" className ="input" placeholder= "Enter user's mail" onChange={handleChange}/>
        <Button className="button" button_text="Send" onClick={handleClick} />
        {message}
      </Modal>
    );
}

export default AddUser;