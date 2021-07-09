import React, {useState, useEffect, useMemo} from "react";
import axios from 'axios';
import Button from '../../components/button'

import Table from '../../components/table'

import '../../style/table.css'
import AddUser from "../../components/addUser";
import AddClients from "../../components/addClients";
import ConfirmDelete from "../../components/confirmDelete";

import {
  BrowserRouter as Router,


  Redirect,
} from "react-router-dom";
var counter = 1;
function Clients(props) {
    const [data, setData] = useState([]);
    const [fullname, setFullName]= useState('');
    const [phone, setPhone]= useState('');
    const [email, setEmail]= useState('');
    const [userId, setUserId] = useState('');
    const [dataChange, setDataChange] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [confirmIsOpen, setConfirmOpen] = useState(false);
    const [whichModal, setWhichModal] = useState('');
    
    useEffect(() => {
        var account_id = localStorage.getItem("account_id");
        axios.post('http://localhost:991/clients/getAll/', {
          account_id: account_id
            }).then(response => {
              console.log(response.data.clients);
              setData(response.data.clients);
              });
    }, [dataChange, modalIsOpen]);

    function changeData() {
      setDataChange(counter++)     
    }

    function deleteClient() {
      console.log('hi');
      axios.post('http://localhost:991/clients/delete/', {
        client_id: userId
          }).then(response => {
            changeData()
            setConfirmOpen(false)
            });
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
                            setUserId(row.cell.row.original.id);      

                          }}>
                            <img class="manImg" src="https://image.flaticon.com/icons/png/128/1345/1345823.png"></img>
                   </span> 

                   <span  onClick={() => {
                            setUserId(row.cell.row.original.id)
                            setFullName(row.cell.row.values.fullname);
                            setPhone(row.cell.row.values.phone);
                            setEmail(row.cell.row.values.email);
                            setIsOpen(true)
                            setWhichModal('edit')            
                          }}>
                            <img class="manImg" src="https://w7.pngwing.com/pngs/613/900/png-transparent-computer-icons-editing-delete-button-miscellaneous-angle-logo.png"></img>
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
       setIsOpen(true)
       setWhichModal('add')
    }

    
    return (
    <body>
   {!(props.isExist)&& <Redirect to="/login" />}
    <div className="test">

    {confirmIsOpen && <ConfirmDelete onclickConfirm={()=>deleteClient()} modalIsOpen={() =>  setConfirmOpen(true)} closeModal={()=> setConfirmOpen(false)}/>}

    {modalIsOpen && <AddClients fullname= {fullname} email= {email} phone ={phone} id={userId} button_text={whichModal} modalIsOpen={() =>  setIsOpen(true)} closeModal={()=> setIsOpen(false)}/>}
    <Table columns={columns} data={data} /> 
    <span className="add_button" button_text="Add Clients" onClick={() => onClickAdd()}>
    <img class="add_image" src="https://www.pikpng.com/pngl/m/4-49677_add-button-with-plus-symbol-in-a-black.png"></img>
      </span>  

    </div>
    
    </body>
    );
}

export default Clients;