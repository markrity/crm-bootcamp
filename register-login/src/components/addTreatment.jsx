import React, { Component } from 'react';
import Select from 'react-select';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import  {useState, useEffect, useMemo} from "react";
import Button from '../components/button'
import AddClients from '../components/addClients'
import NextAddTreatment from '../components/nextAddTreatment'



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
    
    const [data, setData] = useState([]);
    const [chosen, setChosen] = useState('');
    const [isNextButtonShown, setButtonNextShown] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [nextOpen, setNextOpen] = useState(false);
    
    useEffect(() => {
        
        axios.post('http://localhost:991/clients/getAll/', {
          account_id: account_id
            }).then(response => {
              //console.log(response.data.clients);
              setData(response.data.clients);
            //  console.log(data);
              });
    },[addOpen]);
    
    const options = data.map(d => ({
    "label" : d.fullname 
    }))


    function getClientIdByName(fullname) {

        setButtonNextShown(true)
        axios.post('http://localhost:991/clients/get/', {
          account_id: account_id,
          fullname: fullname
            }).then(response => {
              setChosen(...response.data.clients);
            //   console.log(chosen.id);
            
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
            <Select defaultValue={{label:props.chosen_client}} options={options} onChange={e => getClientIdByName(e.label)} />
            <div className="buttons_chooseClient">
            <div className="add_new">
            <p id="client_not_found">client not found?</p>
            <Button className="add" button_text="add new client" onClick={()=> setAddOpen(true)} />
            </div>
            {isNextButtonShown && <Button className="next" button_text="next ->" onClick={()=> setNextOpen(true)} /> }
            </div>
            {addOpen && <AddClients  button_text='add' modalIsOpen={() =>  setAddOpen(true)} closeModal={()=> setAddOpen(false)}/>}
            {nextOpen && <NextAddTreatment kind={props.kind} price = {props.price} date={props.date} client_id = {chosen.id} client_name = {chosen.fullname} button_text='add' modalIsOpen={() =>  setNextOpen(true)} closeModal={() =>  setNextOpen(false)} closeAllModals={closeAllModals}/>}
        </div>
      
      </Modal>
    );
  }


export default AddTreatment