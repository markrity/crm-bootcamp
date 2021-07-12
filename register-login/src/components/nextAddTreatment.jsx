import React from 'react';
import Select from 'react-select';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import  {useState, useEffect, useMemo} from "react";
import Button from '../components/button'
import FormInput from '../components/formInput'
import { connectToServerPhpAdd} from "../helpers/api_helpers";

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      height                : '70%',
      width                 : '30%',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

function NextAddTreatment(props) {
    
     const [data, setData] = useState([]);
     const [chosen, setChosen] = useState('');
     const [price, setPrice] = useState('');
     const [kind, setKind] = useState('');
     const [date_time, setDateTime] = useState('');
     const [options1, setOption1] = useState([]);

    
    useEffect(() => {
        const token = localStorage.getItem("my_user");

        axios.post('http://kerenadiv.com:8005/getAllUsers', {
            token: token 
            }).then(response => {
              setData(response.data);
             console.log(data);
              });
    },[]);
    
    const options = data.map(d => ({
    label : d.user_fullname , value : ""
    }))

    
    const kinds = [
        {label: "anti aging", value : ""},
        {label : "acne", value : ""}
    ]

    async function handleClick() {
        if (props.button_text === 'add') {     

        const account_id = localStorage.getItem("account_id");
        const params = { client_id : props.client_id, kind, price, date_time, account_id, created_at: Date.now(), user_id:chosen}
        const res = await connectToServerPhpAdd(params, 'treatments')
        if (res) {
            props.closeAllModals()
        }
    }
    else {

    }
    }

    function getUserId(user_name) {
        let found = data.find(e => e.user_fullname === user_name);
        setChosen(found.user_id);
    }
  

    return (
    <Modal 
    isOpen={props.modalIsOpen}
    onRequestClose={props.closeAllModals}
    style={customStyles}
    >
        <Button className="close" button_text="<-prev" onClick={props.closeModal} />
        <div className="container">  
            <p id ="header_client">client name: {props.client_name} </p>
            
            <Select placeholder="choose client" defaultValue = {{label: props.kind}} options={kinds} onChange={e => setKind(e.label)}  />
          
            <FormInput label="date and time" defaultValue = {props.date} type = "datetime-local" className ="input" placeholder= "choose date and time" onChange={e=> setDateTime(e.target.value)}/>
            <FormInput label="Price" defaultValue = {props.price} type = "text" className ="input" placeholder= "Enter price" onChange={e=> setPrice(e.target.value)}/>
          
            <Select options={options} onChange={e => getUserId(e.label)} />   
            <Button className="button" button_text={props.button_text} onClick={handleClick} />
        </div>
    </Modal>
    );
  }


export default NextAddTreatment