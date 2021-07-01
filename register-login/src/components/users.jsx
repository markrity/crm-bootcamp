import React, {useState, useEffect, useMemo} from "react";
import axios from 'axios';
import Button from '../components/button'

import Table from '../components/table'

import '../style/table.css'
import AddUser from "../containers/addUser/addUser";

function Users(props) {
    const [data, setData] = useState([]);
    const [showAddUser, setShowAddUser] = useState(false);

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
    

    return (
    <body>
        
    <div className="test">
    {/* TODO add here functionality */}
    {showAddUser && <AddUser/>}
    <Table  columns={columns} data={data} />
    
   
    </div>
    
    </body>
    );
}

export default Users;