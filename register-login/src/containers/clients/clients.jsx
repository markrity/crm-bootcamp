import React, {useState, useEffect, useMemo} from "react";
import axios from 'axios';
import Button from '../../components/button'
import AddClients from "../../components/addClients";

import Table from '../../components/table'

import '../../style/table.css'
import ConfirmDelete from "../../components/confirmDelete";

import {
  BrowserRouter as Router,


  Redirect,
} from "react-router-dom";
import { connectToServerPhpAdd, connectToServerPhpDelete } from "../../helpers/api_helpers";
var counter = 1;
function Clients(props) {
    const [data, setData] = useState([]);
    const [fullname, setFullName]= useState('');
    const [phone, setPhone]= useState('');
    const [email, setEmail]= useState('');
    const [clientId, setClientId] = useState('');
    const [rowData, setRowData] = useState('');
    const [dataChange, setDataChange] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [confirmIsOpen, setConfirmOpen] = useState(false);
    const [whichModal, setWhichModal] = useState('');
    const [openClientData, setOpenClientData] = useState(false);
    
    useEffect(() => {
        var account_id = localStorage.getItem("account_id");
        axios.post('http://localhost:991/clients/getAll/', {
          account_id: account_id
            }).then(response => {
           //   console.log(response.data.clients);
              setData(response.data.clients);
              });
    }, [dataChange, modalIsOpen]);

    function changeData() {
      setDataChange(counter++)     
    }


    const columns = useMemo(
        () => [
          {
            Header: "Clients",
            columns: [
              {
                Header: "Full name",
                accessor: "fullname"
              },

              {
                Header: "Phone",
                accessor: "phone"
              }, 

              {
                Header: "Email",
                accessor: "email"
              }  ,
              {
                Header: "Actions",

                Cell: (row)=> (
                  <div className= "action">
                    
                  <span  onClick={() => {
                            setConfirmOpen(true)
                            setClientId(row.cell.row.original.id);      
                          }}>
                            <img class="manImg" src="https://image.flaticon.com/icons/png/128/1345/1345823.png"></img>
                   </span> 

                   <span  onClick={() => {
                            setClientId(row.cell.row.original.id)
                            setFullName(row.cell.row.values.fullname);
                            setPhone(row.cell.row.values.phone);
                            setEmail(row.cell.row.values.email);
                            setWhichModal('edit')
                            setIsOpen(true)
                          }}>
                            <img class="manImg" src="https://w7.pngwing.com/pngs/613/900/png-transparent-computer-icons-editing-delete-button-miscellaneous-angle-logo.png"></img>
                   </span> 

                   <span  onClick={() => {
                            setRowData(row.cell.row.values)
                            localStorage.setItem("client_id", row.cell.row.original.id);
                      
                            setOpenClientData(true)
                            
                            // console.log(row.cell.row.values);   
                            // console.log(row.cell.row.original); 
                          }}>
                            <img class="manImg" src="https://img.icons8.com/carbon-copy/2x/import.png"></img>
                   </span> 

                   </div>
                )
              }          
            ]
          }
        ],
        []
      );

    function onClickAdd() {
       setPhone('')
       setEmail('')
       setFullName('')
       setWhichModal('add')
       setIsOpen(true)
    }


 
    async function deleteClient() {
      const params = {id: clientId}
      const response = await connectToServerPhpDelete(params, 'clients')
      if (response) {
        changeData()
        setConfirmOpen(false)
      }
    }
    
    return (
    <body>
   {!(props.isExist)&& <Redirect to="/login" />}
    <div className="test">


    {openClientData && <Redirect to = "/clientData" />}
    {confirmIsOpen && <ConfirmDelete onclickConfirm={()=>deleteClient()} modalIsOpen={() =>  setConfirmOpen(true)} closeModal={()=> setConfirmOpen(false)}/>}

    {modalIsOpen && <AddClients fullname= {fullname} email= {email} phone ={phone} id={clientId} button_text={whichModal} modalIsOpen={() =>  setIsOpen(true)} closeModal={()=> setIsOpen(false)}/>}
    <Table tableID="users"columns={columns} data={data}  /> 
    <span className="add_button" button_text="Add Clients" onClick={() => onClickAdd()}>
    <img class="add_image" src="https://www.pikpng.com/pngl/m/4-49677_add-button-with-plus-symbol-in-a-black.png"></img>
      </span>  

    </div>
    
    </body>
    );
}

export default Clients;