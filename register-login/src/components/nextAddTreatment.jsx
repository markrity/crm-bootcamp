import React from 'react';
import Select from 'react-select';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import  {useState, useEffect, useMemo} from "react";
import Button from '../components/button'
import FormInput from '../components/formInput'
import { connectToServerPhpAdd, connectToServerPhpEdit} from "../helpers/api_helpers";
import AddKinds from './addKinds';

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
const token = localStorage.getItem("my_user");


function NextAddTreatment(props) {
    
     const [data, setData] = useState([]);
     const [userId, setUserId] = useState(props.userId);
     const [clientId, setClientId] = useState(props.client_id);
     const [price, setPrice] = useState(props.price);
     const [kind, setKind] = useState(props.kind);
     const [AllKinds, setAllKinds] = useState([]);
     const [addOpen, setAddOpen] = useState(false);
     const [date_time, setDateTime] = useState(props.date);
     const [allUsers, setAllUsers] = useState([]);

     const [errDate, setErrDate] = useState('');
 
     
    useEffect(() => {

        axios.post('http://kerenadiv.com:8005/getAllUsers', {
            token: token 
            }).then(response => {
               setAllUsers(response.data);
              });
        axios.post('http://localhost:991/kinds/getAll/', {
        account_id : account_id
        }).then(response => {
            setAllKinds(response.data.clients);
            });
    },[addOpen]);
    
    const options = data.map(d => ({
        label : d.user_fullname , value : ""
    }))

    
    const kinds = AllKinds.map(d => ({
        label : d.name , value : ""
    }))

    async function handleClick() {
        const account_id = localStorage.getItem("account_id");
        console.log(userId);
        if (props.button_text === 'add') {     
        const params = { client_id : clientId, kind, price, date_time, account_id, created_at: Date.now(), user_id:userId}
        const res = await connectToServerPhpAdd(params, 'treatments')
        if (res) {
            props.closeAllModals()
        }
    }
    else {
        console.log(props.treatment_id);
        const params = { client_id : clientId, kind, price, date_time, account_id, created_at: Date.now(), user_id:userId, id:props.treatment_id}
        console.log(params);
        const res = await connectToServerPhpEdit(params, 'treatments')
        if (res) {
            console.log(res);
            props.closeAllModals()
        }
    }
    }

    function getUserId(user_name) {
        let found = data.find(e => e.user_fullname === user_name);
        setUserId(found.user_id);
        console.log(data);
    }

    function getAvailableUsersByDate(date) {
        setDateTime(date);


        axios.post('http://localhost:991/treatments/getAvailableUsers/', {
            account_id : account_id,
            date: date
            }).then(response => {
                console.log(response.data.clients);
                if (response.data.clients.length===allUsers.length) {
                    setErrDate('There are no available users at this time!')
                }
                else {
                  //to do here move on the res and remove from all users ! and set it to data
                }
                setData(response.data.clients);
                });
    }
  

    return (
    <Modal 
    isOpen={props.modalIsOpen}
    onRequestClose={props.closeAllModals}
    style={customStyles}
    >
        <Button className="close" button_text="<-prev" onClick={props.closeModal} />
        <div className="container">  
            <p id ="header_client">client name: {props.client_name1} </p>
            
            <Select  defaultValue = {{label: props.kind}} options={kinds} onChange={e => setKind(e.label)}  />
            <Button className="add_kind" button_text="add new kind" onClick={()=> setAddOpen(true)} />
            {addOpen && <AddKinds  button_text='add' modalIsOpen={() =>  setAddOpen(true)} closeModal={()=> setAddOpen(false)}/>}
          
            <FormInput label="date and time" defaultValue = {date_time} type = "datetime-local" className ="input" placeholder= "choose date and time" onChange={e=> getAvailableUsersByDate(e.target.value)}/>
          
             <Select options={options} defaultValue = {{label: props.user_name}} onChange={e => getUserId(e.label)} /> 
             {errDate}  
            <FormInput label="Price" defaultValue = {props.price} type = "text" className ="input" placeholder= "Enter price" onChange={e=> setPrice(e.target.value)}/>
        
            <Button className="button" button_text={props.button_text} onClick={handleClick} />
        </div>
    </Modal>
    );
  }


export default NextAddTreatment