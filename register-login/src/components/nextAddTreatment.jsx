import React, { Component } from 'react';
import Select from 'react-select';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import  {useState, useEffect, useMemo} from "react";
import Button from '../components/button'
import AddClients from '../components/addClients'
import FormInput from '../components/formInput'



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

function NextAddTreatment(props) {
    
     const [data, setData] = useState([]);
     const [chosen, setChosen] = useState('');
     const [price, setPrice] = useState('');

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


    // function getUserIdByName(fullname) {
    //     axios.post('http://localhost:991/clients/get/', {
    //       account_id: account_id,
    //       fullname: fullname
    //         }).then(response => {
    //           setChosen(...response.data.clients);
    //         //   console.log(chosen.id);
            
    //           });
    // }
    
   

    return (
        <Modal 
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
    >
    <Button className="close" button_text="X" onClick={props.closeModal} />


      <div className="container">
        {/* <div className="row"> */}
          {/* <div className="col-md-3"></div> */}
          {/* <div className="col-md-6"> */}
          <p>client  : {props.client}</p>
          
          <FormInput label="Price" defaultValue = {props.email} type = "text" className ="input" placeholder= "Enter price" onChange={e=> setPrice(e.target.value)}/>
          <Select options={options} onChange={e => setChosen(e.label)} />
          
           

          {/* </div> */}
          {/* <div className="col-md-4"></div> */}
        {/* </div> */}
      </div>
      
      </Modal>
    );
  }


export default NextAddTreatment