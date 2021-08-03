import React, {useState, useEffect, useMemo} from "react";
import axios from 'axios';
import Button from '../../components/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt, faEdit, faPlusSquare, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import Table from '../../components/table'

import '../../style/table.css'
import AddUser from "../../components/addUser";

function Users(props) {
    const [data, setData] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(() => {
        var token = localStorage.getItem("my_user");
        axios.post('http://kerenadiv.com:8005/getAllUsers', {
            token: token 
            }).then(response => {
               setData(response.data);
              });
    }, []);

   
    const columns = useMemo(
        () => [
          {
            Header: "",
            isVisible: false,
            id: "teams",
       
            columns: [
              {
                Header: "FULL NAME",
                accessor: "user_fullname"
              },

              {
                Header: "EMAIL",
                accessor: "user_mail"
              }, 

              {
                Header: "PHONE",
                accessor: "user_phone"
              }            
            ]
          }
        ],
        []
      );

    function openModal() {
      setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    
    return (
  
    <div className="test">
    {modalIsOpen && <AddUser modalIsOpen={() => openModal()} closeModal={() => closeModal()}/>}
    <Table class_name="table_container" tableID="users" columns={columns} data={data} /> 
    <button className="add_button_tre"  onClick={() => openModal()}> 
    <FontAwesomeIcon icon={faPlusSquare} size={"2x"}/>
    <div className="text_add_button">
     Add 
     </div>
    </button>
    </div>
    
   
    );
}

export default Users;