import React, { Component } from 'react';
import Select from 'react-select';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import  {useState, useEffect, useMemo} from "react";




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

function AddTreatment(props) {
    
    const [data, setData] = useState([]);
    const [chosen, setChosen] = useState('');
    useEffect(() => {
        var account_id = localStorage.getItem("account_id");
        axios.post('http://localhost:991/clients/getAll/', {
          account_id: account_id
            }).then(response => {
              console.log(response.data.clients);
              setData(response.data.clients);
            //  console.log(data);
              });
    },[]);
    
    const options = data.map(d => ({
    "label" : d.fullname
    }))
    
    function printChosen(e) {
        console.log(e.label);
    }

    return (
        <Modal 
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
    >
      <div className="container">
        {/* <div className="row"> */}
          {/* <div className="col-md-3"></div> */}
          {/* <div className="col-md-6"> */}
            <Select options={options} onChange={e => printChosen(e)} />
          {/* </div> */}
          {/* <div className="col-md-4"></div> */}
        {/* </div> */}
      </div>
      </Modal>
    );
  }


export default AddTreatment