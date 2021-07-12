import React, {useState, useEffect, useMemo, useLayoutEffect} from "react";
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
import { connectToServerPhpAdd, connectToServerPhpDelete } from "../../helpers/api_helpers";
import AddTreatment from "../../components/addTreatment";
var counter = 1;
function Treatments(props) {
    const [data, setData] = useState([]);
    const [date, setDate]= useState('');
    const [kind, setKind]= useState('select kind...');
    const [price, setPrice]= useState('');
    const [clientName, setClientName]= useState('select client...');
    const [treatmentId, setTreId] = useState('');
    const [dataChange, setDataChange] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [confirmIsOpen, setConfirmOpen] = useState(false);
    const [whichModal, setWhichModal] = useState('');
    
    useEffect(() => {
        var account_id = localStorage.getItem("account_id");
        axios.post('http://localhost:991/treatments/getAll/', {
          account_id: account_id
            }).then(response => {
           //   console.log(response.data.clients);
              setData(response.data.clients);
              });
    }, [dataChange, modalIsOpen]);

    function changeData() {
      setDataChange(counter++)     
    }

    async function deleteTreatment() {
      const params = {id: treatmentId}
      const response = await connectToServerPhpDelete(params, 'treatments')
      if (response) {
        changeData()
        setConfirmOpen(false)
      }
    }

  

    String.prototype.replaceAt = function(index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }

    const columns = useMemo(
        () => [
          {
            Header: "Treatment",
            columns: [
              {
                Header: "client_id",
                accessor: "client_id"
              },

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
                Header: "user_id",
                accessor: "user_id"
              } ,
              {
                Header: "Actions",

                Cell: (row)=> (
                  <div className= "action">
                    
                  <span  onClick={() => {
                            setConfirmOpen(true)
                            setTreId(row.cell.row.original.id);      

                          }}>
                            <img class="manImg" src="https://image.flaticon.com/icons/png/128/1345/1345823.png"></img>
                   </span> 

                   <span  onClick={() => {
                            setDate(row.cell.row.values.date_time)
                            setDate(date.replaceAt(10, "T"))
                            setPrice(row.cell.row.values.price);
                            setKind(row.cell.row.values.kind);
                            setClientName('neta kim')
                            setWhichModal('edit')   
                            setIsOpen(true)
                                    
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
       setDate('')
       setPrice('')
       setKind('select kind...')
       setClientName('select client...')
       setIsOpen(true)
       setWhichModal('add')
    }

    
    return (
    <body>
    {!(props.isExist)&& <Redirect to="/login" />}
    <div className="test">

    {confirmIsOpen && <ConfirmDelete onclickConfirm={()=>deleteTreatment()} modalIsOpen={() =>  setConfirmOpen(true)} closeModal={()=> setConfirmOpen(false)}/>}

    {modalIsOpen && <AddTreatment client_name = {clientName} button_text = {whichModal} date= {date} kind={kind} price={price} data = {data} modalIsOpen={() =>  setIsOpen(true)} closeModal={()=> setIsOpen(false)}/>}
    
    <Table columns={columns} data={data} /> 
    <span className="add_button" button_text="Add Treatments" onClick={() => onClickAdd()}>
    <img class="add_image" src="https://www.pikpng.com/pngl/m/4-49677_add-button-with-plus-symbol-in-a-black.png"></img>
      </span>  

    </div>
    
    </body>
    );
}

export default Treatments;