import React, {useState} from "react";
import Button from '../components/button'
import FormInput from '../components/formInput'
import axios from 'axios';
import Modal from 'react-modal';
import '../style/button.css'
import '../style/table.css'
import { errMessage } from "../constans/constants";
import { connectToServerPhpAdd, connectToServerPhpEdit, connectToServerPhpGetAll } from "../helpers/api_helpers";
import { validationInput } from "../helpers/validation";
function AddClients(props) {
    const [fullname, setName] = useState(props.fullName);
    const [phone, setPhone] = useState(props.phone)
    const [email, setEmail] = useState(props.email);
    const [err, setErr] = useState("'name_validate': ''","'phone_validate': ''", "'email_validate': ''" )
    const [name_message, setNameMessage] = useState('');
    const [phone_message, setPhoneMessage] = useState('');
    const [email_message, setEmailMessage] = useState('');

   async function handleClick() {
       
        if (props.button_text === 'add') {     
            const account_id = localStorage.getItem("account_id");
           // checkValidation({full_name: fullName, phone: phone, email: email})
            const params = { fullname, phone, email, account_id}
            const res = await connectToServerPhpAdd(params, 'clients')
            if (res) {
                props.closeModal()
            }
        }

        else {
            const params = {fullname, phone, email,id: props.id}
            const res = await connectToServerPhpEdit(params, 'clients')
            if (res) {
                props.closeModal()
            }
        } 
    }

    // function checkValidation(params) {
    //     const flag = true; 
    //     const valid = validationInputClient(params);
    //     Object.entries(valid).forEach(item => {
    //         if (!item[1]) {
    //              setErr(item[0], item[1])  
    //              flag =  false;                 
    //           }
    //       })
    //       return flag;
    // }

   
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
        <FormInput label="Full name" defaultValue = {props.fullname} type = "text" className ="input" placeholder= "Enter client's full name" onChange={e=> setName(e.target.value)}/>
        <FormInput label="Phone" defaultValue = {props.phone} type = "text" className ="input" placeholder= "Enter client's phone" onChange={e=> setPhone(e.target.value)}/>
        <FormInput label="Email" defaultValue = {props.email} type = "text" className ="input" placeholder= "Enter client's mail" onChange={e=> setEmail(e.target.value)}/>
        <Button className="button" button_text={props.button_text} onClick={handleClick} />
     
      </Modal>
    );
}

export default AddClients;