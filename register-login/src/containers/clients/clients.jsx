import React, {useState, useEffect, useMemo} from "react";
import axios from 'axios';
import Button from '../../components/button'
import AddClients from "../../components/addClients";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt, faEdit, faPlusSquare, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import Table from '../../components/table'

import '../../style/table.css'
import ConfirmDelete from "../../components/confirmDelete";

import {
  BrowserRouter as Router,


  Redirect,
} from "react-router-dom";
import { connectToServerPhpAdd, connectToServerPhpDelete } from "../../helpers/api_helpers";
import ButtonIcon from "../../components/buttonIcon";
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
            Header: "",
            isVisible: false,
            id: "teams",
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
                        <FontAwesomeIcon  icon={faTrashAlt} size={"1x"}/>
                   </span> 

                   <span  onClick={() => {
                            setClientId(row.cell.row.original.id)
                            setFullName(row.cell.row.values.fullname);
                            setPhone(row.cell.row.values.phone);
                            setEmail(row.cell.row.values.email);
                            setWhichModal('edit')
                            setIsOpen(true)
                          }}>
                          <FontAwesomeIcon  icon={faEdit} size={"1x"}/>
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

    const onclickRow = (e, client) =>{
      console.log(client.original.id);
      localStorage.setItem("client_id", client.original.id);
      setOpenClientData(true)
    }
    
    return (
    <body>
   {!(props.isExist)&& <Redirect to="/login" />}
    <div className="test">


    {openClientData && <Redirect to = "/clientData" />}
    {confirmIsOpen && <ConfirmDelete onclickConfirm={()=>deleteClient()} modalIsOpen={() =>  setConfirmOpen(true)} closeModal={()=> setConfirmOpen(false)}/>}

    {modalIsOpen && <AddClients fullname= {fullname} email= {email} phone ={phone} id={clientId} button_text={whichModal} modalIsOpen={() =>  setIsOpen(true)} closeModal={()=> setIsOpen(false)}/>}
    <Table onClick = {onclickRow} tableID="users" columns={columns} data={data}  /> 

    <button className="add_button_tre"  onClick={() => onClickAdd()}> 
    <FontAwesomeIcon icon={faPlusSquare} size={"2x"}/>
    <div className="text_add_button">
     Add 
     </div>
    </button>

    </div>
    
    </body>
    );
}

export default Clients;