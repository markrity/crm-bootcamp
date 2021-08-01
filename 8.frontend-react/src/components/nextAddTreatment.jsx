import React from 'react';
import Select from 'react-select';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import  {useState, useEffect, useMemo} from "react";
import Button from './button'
import FormInput from './formInput'
import { connectToServerPhpAdd, connectToServerPhpEdit} from "../helpers/api_helpers";
import AddKinds from './addKinds';
import Users from '../containers/users/users';
import {getAvailableUsers} from '../helpers/api_helpers'

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
    
     const [userId, setUserId] = useState(props.userId);
     const [clientId, setClientId] = useState(props.client_id);
     const [price, setPrice] = useState(props.price);
     const [kind, setKind] = useState(props.kind);
     const [AllKinds, setAllKinds] = useState([]);
     const [addOpen, setAddOpen] = useState(false);
     const [date_time, setDateTime] = useState(props.date);
     const [allUsers, setAllUsers] = useState([]);
     const [notAvbUsers, setNotUsers] = useState([]);
     const [options, setOptions] = useState([]);
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
        let found = allUsers.find(e => e.user_fullname === user_name);
        setUserId(found.user_id);
        console.log(allUsers);
    }
  
    function comparer(otherArray){
        return function(current){
          return otherArray.filter(function(other){
            console.log(other.user_fullname);
            console.log(current.user_fullname );
            return other.user_fullname == current.user_fullname 
          }).length == 0;
        }
      }
      
     
  

    async function getAvailableUsersByDate(date) {
        setDateTime(date);

        const params = {account_id : account_id,date: date}
        const response = await getAvailableUsers(params);
        console.log(response);
        if (response.data.clients.length===allUsers.length) {
            setOptions([])
            setErrDate('There are no available users at this time!')
        }

        else if  (response.data.clients.length===0) {
            setErrDate('')
            setOptions([])
            setOptions(allUsers.map(d => ({
                label : d.user_fullname , value : ""
            })));
        }

        else {
           setErrDate('')
           setOptions([])
           setNotUsers(...response.data.clients)
 
           let onlyInA=[];

           const notavb = {...response.data.clients};
        
            for (let i=0; i<[notavb].length; i++) {
            onlyInA = onlyInA.concat(allUsers.filter(comparer([notavb[i]])))
 
            }
            setOptions(onlyInA.map(d => ({
            label : d.user_fullname , value : ""
        })));       
 
        }
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