import React, { Component } from 'react';
import Select from 'react-select';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import  {useState, useEffect, useMemo} from "react";
import Button from '../components/button'
import AddClients from '../components/addClients'
import FormInput from '../components/formInput'
import { connectToServerPhpAdd, connectToServerPhpEdit, connectToServerPhpGetAll } from "../helpers/api_helpers";



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

const account_id = localStorage.getItem("account_id");

function NextAddTreatment(props) {
    
     const [data, setData] = useState([]);
     const [chosen, setChosen] = useState('');
     const [price, setPrice] = useState('');
     const [kind, setKind] = useState('');
     const [date_time, setDateTime] = useState('');

    // const [addOpen, setAddOpen] = useState(false);
    // const [nextOpen, setNextOpen] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem("my_user");

        axios.post('http://kerenadiv.com:8005/getAllUsers', {
            token: token 
            }).then(response => {
              //console.log(response.data.clients);
              setData(response.data);
             console.log(data);
              });
    },[]);
    
    const options = data.map(d => ({
    "label" : d.user_fullname 
    }))

    const kinds = [
        {"label": "anti aging"},
        {"label" : "acne"}
    ]

    async function handleClick() {
        const account_id = localStorage.getItem("account_id");
        const params = { client_id : props.client_id, kind, price, date_time, account_id, created_at: Date.now(), user_id:chosen}
        const res = await connectToServerPhpAdd(params, 'treatments')
        if (res) {
            props.closeAllModals()
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
    
          <p>client name: {props.client_name} </p>
          <Select options={kinds} onChange={e => setKind(e.label)}  />
          <FormInput label="date and time" defaultValue = {props.email} type = "datetime-local" className ="input" placeholder= "choose date and time" onChange={e=> setDateTime(e.target.value)}/>
          <FormInput label="Price" defaultValue = {props.email} type = "text" className ="input" placeholder= "Enter price" onChange={e=> setPrice(e.target.value)}/>
          <p>choose user:  </p>
          
          <Select options={options} onChange={e => getUserId(e.label)} />   
          <Button className="button" button_text={props.button_text} onClick={handleClick} />
      </div>
      
      </Modal>
    );
  }


export default NextAddTreatment