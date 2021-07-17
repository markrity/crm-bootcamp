import React, {useState} from "react";
import Button from '../components/button'
import FormInput from '../components/formInput'
import axios from 'axios';
import Modal from 'react-modal';
import '../style/button.css'
import '../style/table.css'
import { errMessage } from "../constans/constants";
import { connectToServerPhpAdd, connectToServerPhpEdit, connectToServerPhpGetAll } from "../helpers/api_helpers";
import { validationInputClient } from "../helpers/validation";
function AddClients(props) {
    const [fullname, setName] = useState(props.fullName);
    const [phone, setPhone] = useState(props.phone)
    const [email, setEmail] = useState(props.email);
    //  const [err, setErr] = useState([{'name_validate' :  'dfs'},{'phone_validate' :  ''},{ 'email_validate' :  ''}])
     const[array,setArray]= useState([
        {id: 1, 'name_validate' :  ''},
        {id: 2, 'phone_validate' :  ''},
        {id: 3, 'email_validate' :  ''},
    ])
    const [name_message, setNameMessage] = useState('');
    const [phone_message, setPhoneMessage] = useState('');
    const [email_message, setEmailMessage] = useState('');

   async function handleClick() {
    const params1 = {full_name:fullname, phone, email}
        if (!checkValidation(params1)) {
           
        }

        else if (props.button_text === 'add') {
          //  setErr[0]['name_validate']('fsfdsffffffff')
            console.log(array);     
        //     const account_id = localStorage.getItem("account_id");
        //    // checkValidation({full_name: fullName, phone: phone, email: email})
        //     const params = { fullname, phone, email, account_id}
        //     const res = await connectToServerPhpAdd(params, 'clients')
        //     if (res) {
        //         props.closeModal()
        //     }
        }

        else {
            const params = {fullname, phone, email,id: props.id}
            const res = await connectToServerPhpEdit(params, 'clients')
            if (res) {
                props.closeModal()
            }
        } 
    }
    const updateItem =(id, whichvalue, newvalue)=> {
        var index = array.findIndex(x=> x.id === id);
      
        let g = array[index]
        g[whichvalue] = newvalue
        if (index === -1){
          // handle error
          console.log('no match')
        }
        else
          setArray([
            ...array.slice(0,index),
            g,
            ...array.slice(index+1)
          ]
                  );
      }

    function checkValidation(params) {
        var flag = true; 

        const valid = validationInputClient(params);
        if (!valid['name_validate']) {
            setNameMessage('invalid name')
            flag=false
        }
        if (!valid['phone_validate']) {
            setPhoneMessage('invalid phone')
            flag=false
        }
        if (!valid['email_validate']) {
            setEmailMessage('invalid email')
            flag=false
        }
        
        return flag;
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
        <FormInput label="Full name" defaultValue = {props.fullname} type = "text" className ="input" placeholder= "Enter client's full name" onChange={e=> setName(e.target.value)}/>
        {name_message}
        <FormInput label="Phone" defaultValue = {props.phone} type = "text" className ="input" placeholder= "Enter client's phone" onChange={e=> setPhone(e.target.value)}/>
        {phone_message}
        <FormInput label="Email" defaultValue = {props.email} type = "text" className ="input" placeholder= "Enter client's mail" onChange={e=> setEmail(e.target.value)}/>
        {email_message}
        <Button className="button" button_text={props.button_text} onClick={handleClick} />
        
      </Modal>
    );
}

export default AddClients;