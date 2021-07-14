import React, {useState, useEffect, useMemo} from "react";
import axios from 'axios';
import Table from '../../components/table'

import '../../style/table_data.css'
import '../../style/table.css'


import {
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

import ClientDetails from "../../components/clientDetails";
import AddTags from "../../components/addTags";
var counter = 1;

function ClientData(props) {
    const [data, setData] = useState([]);
    const [clientName, setClientName]= useState('');
    const [clientRow, setClientRow] = useState([]);
    const [dataChange, setDataChange] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [clientId, setClientId] = useState(false);
    
    useEffect(() => {
        const account_id = localStorage.getItem("account_id");
        const client_id = localStorage.getItem("client_id");
        setClientId(client_id)
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
              setClientRow(...response.data.clients);
              console.log(...response.data.clients);
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

    <div className= "data_about_client"> 
    <ClientDetails client_fullname={clientRow.fullname} client_phone={clientRow.phone} client_email={clientRow.email}/>
    </div>

    <div className="container1"> 
    

    <div className="table_and_select">
    <Table tableID="clientData" columns={columns} data={data}  /> 
    </div>

    <div className= "client_tags"> 
    <AddTags client_id = {clientId}/>
    </div>
   
    </div>

    </div>
    
    </body>
    );
}

export default ClientData;