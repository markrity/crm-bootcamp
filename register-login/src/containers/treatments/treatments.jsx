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
    const [userName, setUserName]= useState('select user...');
    const [treatmentId, setTreId] = useState('');
    const [userId, setUserId] = useState('');
    const [dataChange, setDataChange] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [confirmIsOpen, setConfirmOpen] = useState(false);
    const [whichModal, setWhichModal] = useState('');
    
    useEffect(() => {
        var account_id = localStorage.getItem("account_id");
        axios.post('http://localhost:991/treatments/getTreatmentTable/', {
          account_id: account_id
            }).then(response => {
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
        if (index >= this.length) {
            return this.valueOf();
        }
     
        return this.substring(0, index) + replacement + this.substring(index + 1);
    }

    const columns = useMemo(
        () => [
          {
            Header: "Treatment",
            columns: [
              {
                Header: "client_name",
                accessor: "fullname"
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
                Header: "user_name",
                accessor: "user_fullname"
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
                            console.log(row.cell.row.values.date_time);
                            setDate(row.cell.row.values.date_time)
                            const new_date = date.replaceAt(10, "T");
                            setDate(new_date)
                            setTreId(row.cell.row.original.id);
                            setPrice(row.cell.row.values.price);
                            setKind(row.cell.row.values.kind);
                            setUserId(row.cell.row.values.user_id)
                            setClientName(row.cell.row.values.fullname)
                            setUserName(row.cell.row.values.user_fullname)
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
       setUserId('')
       setDate('')
       setKind('select kind...')
       setClientName('select client...')
       setUserName('select user...')
       setIsOpen(true)
       setWhichModal('add')
    }

    
    return (
    <body>
    {!(props.isExist)&& <Redirect to="/login" />}
    <div className="test">

    {confirmIsOpen && <ConfirmDelete onclickConfirm={()=>deleteTreatment()} modalIsOpen={() =>  setConfirmOpen(true)} closeModal={()=> setConfirmOpen(false)}/>}

    {modalIsOpen && <AddTreatment user_id = {userId} treatment_id = {treatmentId} whichModal = {whichModal} user_name= {userName} client_name = {clientName} button_text = {whichModal} date= {date} kind={kind} price={price} data = {data} modalIsOpen={() =>  setIsOpen(true)} closeModal={()=> setIsOpen(false)}/>}
    
    <Table columns={columns} data={data} /> 
    <span className="add_button" button_text="Add Treatments" onClick={() => onClickAdd()}>
    <img class="add_image" src="https://www.pikpng.com/pngl/m/4-49677_add-button-with-plus-symbol-in-a-black.png"></img>
      </span>  

    </div>
    
    </body>
    );
}

export default Treatments;