import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
function  ShowPic (props){

const [imgArr, setImgArr] = useState([]);
 
useEffect(() => {
    const client_id = localStorage.getItem("client_id");
    const account_id = localStorage.getItem("account_id");

    axios.post('http://localhost:991/picPerClient/getPics/', {
        client_id,
        account_id
    }
    ).then(res=>
    { 
    console.log(res.data.pics);
    setImgArr(res.data.pics)
    }
    );
    
},[]);

const imgSrc = imgArr.map(d => ({
   src: 'http://localhost:991/img/'+ d.picFileName 
}))

return (
    
  <div>

  {imgSrc.map(img => (<img height= "100px" src={img.src} /> ))}

  </div>
    );
  }


export default ShowPic;