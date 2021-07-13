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
function AddKinds(props) {
    const [name, setName] = useState(props.name);
    
   async function handleClick() {
        if (props.button_text === 'add') {     
            const account_id = localStorage.getItem("account_id");
           // checkValidation({full_name: fullName, phone: phone, email: email})
            const params = {name, account_id}
            const res = await connectToServerPhpAdd(params, 'kinds')
            if (res) {
                props.closeModal()
            }
        }

        else {
            const params = {name,id: props.id}
            const res = await connectToServerPhpEdit(params, 'kinds')
            if (res) {
                props.closeModal()
            }
        } 
    }

    function checkValidation(params) {
        const valid = validationInput(params);
        Object.entries(valid).forEach(item => {
            if (!item[1]) {
              console.log(item);                          
              }
          })
    
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
        <FormInput label="kind name" defaultValue = {props.name} type = "text" className ="input" placeholder= "Enter kind's name" onChange={e=> setName(e.target.value)}/>
        <Button className="button" button_text={props.button_text} onClick={handleClick} />
     
      </Modal>
    );
}

export default AddKinds;