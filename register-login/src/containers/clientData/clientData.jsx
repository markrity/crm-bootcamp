import React, {useState, useEffect, useMemo} from "react";
import axios from 'axios';
import Select from 'react-select';

import Table from '../../components/table'

import '../../style/table_data.css'
import '../../style/table.css'
import AddUser from "../../components/addUser";
import AddClients from "../../components/addClients";
import ConfirmDelete from "../../components/confirmDelete";

import {
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

import { connectToServerPhpAdd, connectToServerPhpDelete } from "../../helpers/api_helpers";
var counter = 1;

function ClientData(props) {
    const [data, setData] = useState([]);
    const [clientName, setClientName]= useState('');
    const [phone, setPhone]= useState('');
    const [email, setEmail]= useState('');
    const [clientId, setClientId] = useState('');
    const [clientData, setClientData] = useState([]);
    const [dataChange, setDataChange] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [confirmIsOpen, setConfirmOpen] = useState(false);
    
    useEffect(() => {
        var account_id = localStorage.getItem("account_id");
        var client_id = localStorage.getItem("client_id");
        axios.post('http://localhost:991/treatments/getTreatmentTableOfClient/', {
          account_id: account_id,
          client_id: client_id
            }).then(response => {
              setData(response.data.treatments);
              if (response.data.treatments.length > 0) {
                 setClientName(response.data.treatments[0].fullname);
              }
              });


        axios.post('http://localhost:991/clients/getClientNameByID/', {
          account_id: account_id,
          client_id: client_id
            }).then(response => {
              setClientData(response.data.clients);
              console.log(response.data.clients);
              });
    }, [dataChange, modalIsOpen]);

    function changeData() {
      setDataChange(counter++)     
    }

    const columns = useMemo(
        () => [
          {
            Header: "treatments" ,
            columns: [
                  {
                    Header: "data & time",
                    accessor: "date_time"
                  }, 
    
                  {
                    Header: "kind",
                    accessor: "kind"
                  }  ,
                  
                  {
                    Header: "price",
                    accessor: "price"
                  } ,
    
                  {
                    Header: "user_name",
                    accessor: "user_fullname"
                  } ,
                     
            ]
          }
        ],
        []
      );

    function onClickAdd() {
       setIsOpen(true)
    }

    const options = [
      {label:"all treatments"},
      {label:"future treatments"},
      {label:"past treatments"}
    ]
 


  
    
    return (
    <body>
    {!(props.isExist)&& <Redirect to="/login" />}
    <div className="dataPage">

    <div className= "data_about_client"> write the data about client</div>

    <div className="container1"> 
    <div className= "client_tags"> add tags/ show tags</div>

    <div className="table_and_select">
    <Table tableID="clientData" columns={columns} data={data}  /> 
    </div>
   
    </div>



    </div>
    
    </body>
    );
}

export default ClientData;