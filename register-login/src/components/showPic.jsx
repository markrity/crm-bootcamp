import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {  connectToServerPhpDelete } from "../helpers/api_helpers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt, faEdit, faPlusSquare, trashAlt } from '@fortawesome/free-solid-svg-icons';

function  ShowPic (props){

const [imgArr, setImgArr] = useState([]);

 
useEffect(() => {
   setImgArr(props.imgArr)
   console.log(props.imgArr);
    
},[props.imgArr]);


let imgSrc = [];
if (imgArr.length) {
    imgSrc = imgArr.map(d => ({
        src: 'http://localhost:991/img/'+ d.picFileName ,
        id: d.id
     })) 
}

async function deletePic( id) {
    console.log(id);
    const params = {id}
    const response = await connectToServerPhpDelete(params, 'picPerClient')
    if (response) {
        props.deletePics(id)
    }
  }


return (
    
  <div className="inside_show_pic">

  {imgSrc.map(img =>
  (<div>
  <img height= "100px" src={img.src} /> 
  <span  onClick={()=>deletePic(img.id)}>
     <img class="deleteimg" src="https://image.flaticon.com/icons/png/128/1345/1345823.png"></img>
  </span> 
  </div>))}

  </div>
    );
  }


export default ShowPic;