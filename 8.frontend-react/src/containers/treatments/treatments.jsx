import React, {useState, useEffect, useMemo, useLayoutEffect} from "react";
import axios from 'axios';
import Button from '../../components/button'
import ButtonIcon from '../../components/button'

import FormInput from'../../components/formInput'

import Table from '../../components/table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt, faEdit, faPlusSquare, faSlidersH } from '@fortawesome/free-solid-svg-icons';
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


String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }
 
    return this.substring(0, index) + replacement + this.substring(index + 1);
}


function Treatments(props) {
    const [data, setData] = useState([]);
    const [date, setDate]= useState('');
    const [kind, setKind]= useState('select kind...');
    const [price, setPrice]= useState('');
    const [clientName, setClientName]= useState('select client...');
    const [userName, setUserName]= useState('select user...');
    const [treatmentId, setTreId] = useState('');
    const [userId, setUserId] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


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

  
    const columns = useMemo(
        () => [
          {
            Header: "",
            isVisible: false,
            id: "teams",
       
          
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
                        <FontAwesomeIcon  icon={faTrashAlt} size={"1x"}/>

                   </span> 

                   <span  onClick={() => {
                            const new_date = row.cell.row.values.date_time.substr(0, 10) + 'T' + row.cell.row.values.date_time.substr(10 + 1);
                            setDate(new_date)
                            console.log(new_date);
                            setTreId(row.cell.row.original.id);
                            setPrice(row.cell.row.values.price);
                            setKind(row.cell.row.values.kind);
                            setUserId(row.cell.row.values.user_id)
                            setClientName(row.cell.row.values.fullname)
                            setUserName(row.cell.row.values.user_fullname)
                            setWhichModal('edit')   
                            setIsOpen(true)  
                          }}>
                              
                              <FontAwesomeIcon  icon={faEdit} size={"1x"}/>
                            {/* <img class="manImg" src="https://w7.pngwing.com/pngs/613/900/png-transparent-computer-icons-editing-delete-button-miscellaneous-angle-logo.png"></img> */}
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


    function onClickFilter() {
        var account_id = localStorage.getItem("account_id");
        console.log(startDate);
        console.log(endDate);
        if (endDate && startDate) {
            console.log('fillll');
            axios.post('http://localhost:991/treatments/getTreFilter/', {
            account_id: account_id,
            start_date: startDate,
            end_date: endDate
            }).then(response => {
                console.log(response.data.treatment);

                //console.log(response.data.clients);
                setData(response.data.treatment);
                });

        }
        else {
            console.log('null');
        }
     
    }

    
    return (
    <body>
    {!(props.isExist)&& <Redirect to="/login" />}
    <div className="test">
   
    {confirmIsOpen && <ConfirmDelete onclickConfirm={()=>deleteTreatment()} modalIsOpen={() =>  setConfirmOpen(true)} closeModal={()=> setConfirmOpen(false)}/>}

    {modalIsOpen && <AddTreatment user_id = {userId} treatment_id = {treatmentId} whichModal = {whichModal} user_name= {userName} client_name = {clientName} button_text = {whichModal} date= {date} kind={kind} price={price} data = {data} modalIsOpen={() =>  setIsOpen(true)} closeModal={()=> setIsOpen(false)}/>}
   
    <Table class_name="table_container" tableID="tre" columns={columns} data={data} /> 
    <div className= "up_table_treatment"> 
   
    <FormInput label="choose start date"  type = "datetime-local" className ="input"  onChange={e=> setStartDate(e.target.value)}/>
    <FormInput label="choose end date"  type = "datetime-local" className ="input"  onChange={e=> setEndDate(e.target.value)}/>

    <button className="filter_button"  onClick={() => onClickFilter()}>
    filter
    </button> 

    <button className="add_button_tre"  onClick={() => onClickAdd()}> 
    <FontAwesomeIcon icon={faPlusSquare} size={"2x"}/>
    <div className="text_add_button">
     Add 
     </div>
    </button>
    </div>
    
    </div>
    {/* <p id="header_tre"> Treatments</p> */}
    </body>
    );
}

export default Treatments;