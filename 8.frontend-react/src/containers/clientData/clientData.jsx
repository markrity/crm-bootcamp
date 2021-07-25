import React, {useState, useEffect, useMemo} from "react";
import axios from 'axios';
import Table from '../../components/table'
import Button from '../../components/button'
import CreatableSelect, { makeCreatableSelect } from 'react-select/creatable';

import '../../style/table_data.css'
import '../../style/table.css'
import '../../style/clientDataPage.css'
import {  connectToServerPhpDelete, connectToServerPhpAdd } from "../../helpers/api_helpers";


import {
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

import ClientDetails from "../../components/clientDetails";
import AddPic from "../../components/addPic";
import ShowPic from "../../components/showPic";
import ShowTags from "../../components/showTags";
import AddTags from "../../components/addTags"

var counter = 1;

function ClientData(props) {
    const [data, setData] = useState([]);
    const [clientName, setClientName]= useState('');
    const [clientRow, setClientRow] = useState([]);
    const [dataChange, setDataChange] = useState(0);
    const [tag, setTag] = useState('')

    const[picArr, setPicArr] = useState('')

    const [modalIsOpen, setIsOpen] = useState(false);
    const [alltags, setAlltags] = useState([]);

    const account_id = localStorage.getItem("account_id");
    const client_id = localStorage.getItem("client_id");

    useEffect(() => {
        
     
        axios.post('http://localhost:991/picPerClient/getPics/', {
            client_id,
            account_id
        }
        ).then(res=>
        { 
        console.log(res.data.pics);
        setPicArr(res.data.pics)
        }
        );

        axios.post('http://localhost:991/treatments/getTreatmentTableOfClient/', {
          account_id: account_id,
          client_id: client_id
            }).then(response => {
              setData(response.data.treatments);
              if (response.data.treatments.length > 0) {
                 setClientName(response.data.treatments[0].fullname);
              }
              });

        axios.post('http://localhost:991/tags/getTags/', {
          account_id: account_id,
          client_id: client_id
            }).then(response => {
              console.log('haha');
              setAlltags(response.data.tags);
              });

        axios.post('http://localhost:991/clients/getClientNameByID/', {
          account_id: account_id,
          client_id: client_id
            }).then(response => {
              setClientRow(...response.data.clients);
              console.log(...response.data.clients);
              });
    }, [dataChange, modalIsOpen]);




    function changeData() {
      setDataChange(counter++)     
    }

    async function handleClick() {
      const account_id = localStorage.getItem("account_id");
      const client_id = localStorage.getItem("client_id");
       if (tag) {
      // checkValidation({full_name: fullName, phone: phone, email: email})
       const params = {text:tag, client_id:client_id, account_id:account_id}
       const res = await connectToServerPhpAdd(params, 'tags')
       if (res) {
          console.log('added!');
          changeData()
          setTag('')
       }
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
                     
            ]
          }
        ],
        []
      );


    function updatePicArr(e) {
      setPicArr([...picArr, {account_id,client_id,picFileName:e}])
     // console.log(e);
   }

   function updateTagArr(e) {
      setAlltags([...alltags, {account_id,client_id,text:e}])
    
    // setAlltags(alltags.filter(item => item.name !== e));
 }



  function deleteTag(e) {
    setAlltags(alltags.filter(item => item.id !== e));
  }  

  function deletePic(e) {
    setPicArr(picArr.filter(item => item.id !== e));
  }



      const options = [
        {label:"need to pay"},
        {label:"need to call"}
        
      ]

  
    
    return (
      <div className="dataPage">
    {!(props.isExist)&& <Redirect to="/login" />}
     

      <div className= "data_about_client"> 
      <ClientDetails client_fullname={clientRow.fullname} client_phone={clientRow.phone} client_email={clientRow.email}/>
      </div>

      <div className = "border_pics">
      <div className= "pics">
      <div className="inside_pics">
      <AddPic updatePicArr={(e)=>updatePicArr(e)}/>
      <ShowPic deletePics={(e)=>deletePic(e)} imgArr = {picArr} />
      </div>
      </div>
      </div>

     
      <div className="border_tags" >
      <div className= "client_tags"> 
      <div className="inside_tags">
      <AddTags updateTags={(e)=>updateTagArr(e)}/>
      </div>

      <div className="show_tags">
      <ShowTags deleteTags={(e)=>deleteTag(e)} tagArr={alltags} />
      </div>
     
      </div>
      </div>

      <div className= "border_table">
      <div className="table_and_select">
      <Table class_name="data" tableID="clientData" columns={columns} data={data}  /> 
      </div>
      </div>
    
    
      </div>   
  
    );
}

export default ClientData;