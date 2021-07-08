import React, {useState} from "react";
import Button from '../components/button'
import FormInput from '../components/formInput'
import axios from 'axios';
import Modal from 'react-modal';
import '../style/button.css'
import '../style/table.css'
import { errMessage } from "../constans/constants";
function AddClients(props) {
    const [fullName, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    function handleClickAdd() {
        var account_id = localStorage.getItem("account_id");
        axios.post('http://localhost:991/clients/add/', {
            fullname: fullName,
            phone: phone,
            email: email,
            account_id: account_id
            }).then(response => {
                console.log(response);
              })  
            setMessage('client added!')  
    }

    function handleClickEdit() {
        axios.post('http://localhost:991/clients/edit/', {
            fullname: fullName,
            phone: phone,
            email: email,
            id: props.id
            }).then(response => {
                console.log(response);
              })  
            setMessage('client edited!')  
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
        <FormInput defaultValue = {props.fullname} type = "text" className ="input" placeholder= "Enter client's full name" onChange={e=> setName(e.target.value)}/>
        <FormInput defaultValue = {props.email} type = "text" className ="input" placeholder= "Enter client's phone" onChange={e=> setPhone(e.target.value)}/>
        <FormInput defaultValue = {props.phone} type = "text" className ="input" placeholder= "Enter client's mail" onChange={e=> setEmail(e.target.value)}/>
        <Button className="button" button_text={props.button_text} onClick={handleClickAdd} />
     
        {message}
      </Modal>
    );
}

export default AddClients;