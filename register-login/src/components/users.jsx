import React, {useState, useEffect, useMemo} from "react";
import axios from 'axios';
import Table from '../components/table'

import '../style/table.css'


function Users(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log('we starttttt');
        var token = localStorage.getItem("my_user");
        axios.post('http://kerenadiv.com:8005/getAllUsers', {
            token: token 
            }).then(response => {
               setData(response.data);
               console.log(data);
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
    
    <div> <Table  columns={columns} data={data} /> </div>
    
    </div>
    
    </body>
    );
}

export default Users;