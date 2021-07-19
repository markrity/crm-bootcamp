import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
function  ShowPic (props){

const [imgArr, setImgArr] = useState([]);
 
useEffect(() => {
   setImgArr(props.imgArr)
   console.log(props.imgArr);
    
},[props.imgArr]);


let imgSrc = [];
if (imgArr.length) {
    imgSrc = imgArr.map(d => ({
        src: 'http://localhost:991/img/'+ d.picFileName 
     })) 
}

return (
    
  <div>

  {imgSrc.map(img => (<img height= "100px" src={img.src} /> ))}

  </div>
    );
  }


export default ShowPic;