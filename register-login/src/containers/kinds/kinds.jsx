import React, {useState, useEffect, useMemo} from "react";
import axios from 'axios';
import Button from '../../components/button'

import Table from '../../components/table'

import '../../style/table.css'
import AddUser from "../../components/addUser";
import AddKinds from "../../components/addKinds";
import AddClients from "../../components/addClients";
import ConfirmDelete from "../../components/confirmDelete";

import {
  BrowserRouter as Router,


  Redirect,
} from "react-router-dom";
import { connectToServerPhpAdd, connectToServerPhpDelete } from "../../helpers/api_helpers";
var counter = 1;
function Kinds(props) {
    const [data, setData] = useState([]);
    const [name, setName]= useState('');
    const [kindId, setKindId] = useState('');
    const [dataChange, setDataChange] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [confirmIsOpen, setConfirmOpen] = useState(false);
    const [whichModal, setWhichModal] = useState('');
    
    useEffect(() => {
        var account_id = localStorage.getItem("account_id");
        
        axios.post('http://localhost:991/kinds/getAll/', {
            account_id: account_id
            }).then(response => {
                console.log(response.data.clients);
                setData(response.data.clients);
                });
    }, [dataChange, modalIsOpen]);

    function changeData() {
      setDataChange(counter++)     
    }

    async function deleteKinds() {
      const params = {id: kindId}
      const response = await connectToServerPhpDelete(params, 'kinds')
      if (response) {
        changeData()
        setConfirmOpen(false)
      }
    }

    const columns = useMemo(
        () => [
          {
            Header: "Kinds",
            columns: [
              {
                Header: "kind name",
                accessor: "name"
              },

              {
                Header: "Actions",

                Cell: (row)=> (
                  <div className= "action">
                    
                  <span  onClick={() => {
                            setConfirmOpen(true)
                            setKindId(row.cell.row.original.id);      
                          }}>
                            <img class="manImg" src="https://image.flaticon.com/icons/png/128/1345/1345823.png"></img>
                   </span> 

                   <span  onClick={() => {
                            setName(row.cell.row.values.name);
                            setKindId(row.cell.row.original.id);    
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
       setName('')
       setWhichModal('add')
       setIsOpen(true)
    }

    
    return (
    <body>
   {!(props.isExist)&& <Redirect to="/login" />}
    <div className="test">

    {confirmIsOpen && <ConfirmDelete onclickConfirm={()=>deleteKinds()} modalIsOpen={() =>  setConfirmOpen(true)} closeModal={()=> setConfirmOpen(false)}/>}

    {modalIsOpen && <AddKinds name= {name}  id={kindId} button_text={whichModal} modalIsOpen={() =>  setIsOpen(true)} closeModal={()=> setIsOpen(false)}/>}
    <Table columns={columns} data={data} /> 
    <span className="add_button" button_text="Add Kinds" onClick={() => onClickAdd()}>
    <img class="add_image" src="https://www.pikpng.com/pngl/m/4-49677_add-button-with-plus-symbol-in-a-black.png"></img>
      </span>  

    </div>
    
    </body>
    );
}

export default Kinds;