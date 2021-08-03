import React, { Component } from 'react';
import Select from 'react-select';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import  {useState, useEffect, useMemo} from "react";
import Button from './button'
import AddClients from './addClients'
import NextAddTreatment from './nextAddTreatment'



const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      height                : '55%',
      width                 : '30%',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

const account_id = localStorage.getItem("account_id");

function AddTreatment(props) {
    const [options, setOptions] = useState([]);
    const [data, setData] = useState([]);
    const [whichModal, setWhichModal] =  useState(false);
    const [chosen, setChosen] = useState('');
    const [isNextButtonShown, setButtonNextShown] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [nextOpen, setNextOpen] = useState(false);
    const [clientName, setClientName] = useState(props.client_name);
    
    useEffect(() => {

        String.prototype.replaceAt = function(index, replacement) {
            if (index >= this.length) {
                return this.valueOf();
            }
         
            return this.substring(0, index) + replacement + this.substring(index + 1);
        }

        

        console.log(props.date);
        if (props.whichModal==='edit') {
            setWhichModal(true)
        }
        //setWhichModal(props.whichModal)
        axios.post('http://localhost:991/clients/getAll/', {
          account_id: account_id
            }).then(response => {
              setData(response.data.clients);
              setOptions(response.data.clients.map(d => ({
                label : d.fullname , value : ""
                })))
              });
    },[addOpen]);
    
  

    function getClientIdByName(fullname) {
        setButtonNextShown(true)
        axios.post('http://localhost:991/clients/get/', {
          account_id: account_id,
          fullname: fullname
            }).then(response => {
              setClientName(fullname)
              setChosen(...response.data.clients);
              });
    }
    
    function closeAllModals() {
        setNextOpen(false);
        props.closeModal();
    }
   

    return (
    <Modal 
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
    >
        <Button className="close" button_text="X" onClick={props.closeModal} />
        <p id = "choose_client"> Choose Client</p>

        <div className="container">
            <Select 
            defaultValue={{label:clientName}} 
            options={options} 
            onChange={e => getClientIdByName(e.label)} />
            
            <div className="buttons_chooseClient">
            <div className="add_new">
            <p id="client_not_found">client not found?</p>
            <Button className="add" button_text="add new client" onClick={()=> setAddOpen(true)} />
            </div>
            {whichModal && <Button className="next" button_text="next ->" onClick={()=> setNextOpen(true)}/>}
            {isNextButtonShown && <Button className="next" button_text="next ->" onClick={()=> setNextOpen(true)} /> }
            </div>
            {addOpen && <AddClients  button_text='add' modalIsOpen={() =>  setAddOpen(true)} closeModal={()=> setAddOpen(false)}/>}

            {nextOpen && <NextAddTreatment user_id = {props.user_id} treatment_id = {props.treatment_id} client_name1 = {clientName} user_name = {props.user_name}button_text={props.button_text} kind={props.kind} price = {props.price} date={props.date} client_id = {chosen.id} client_name = {chosen.fullname}  modalIsOpen={() =>  setNextOpen(true)} closeModal={() =>  setNextOpen(false)} closeAllModals={closeAllModals}/>}
        </div>
      
      </Modal>
    );
  }


export default AddTreatment