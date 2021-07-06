import React, {useState, useEffect, useMemo} from "react";
import axios from 'axios';
import Button from '../../components/button'

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
            Header: "Teams",
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
    <body>

    <div className="test">
   
    {modalIsOpen && <AddUser modalIsOpen={() => openModal()} closeModal={() => closeModal()}/>}
    <Table columns={columns} data={data} /> 
    <Button className="add_button" button_text="Add user" onClick={() => openModal()}></Button>
    </div>
    
    </body>
    );
}

export default Users;