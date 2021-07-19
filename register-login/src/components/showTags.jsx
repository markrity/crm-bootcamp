import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
function  ShowTags (props){

const [tagArr, setTagArr] = useState([]);
 
useEffect(() => {
   setTagArr(props.tagArr)
   console.log(props.tagArr);
    
},[props.tagArr]);


let allTags = [];
if (tagArr.length) {
    allTags = tagArr.map(d => ({
       text: d.text
     })) 
}

return (
    
  <div>

{allTags.map(tag => (
          <p  id = "tag_delete"> <div className="tagsDiv">{tag.text}</div>
              {/* <span  onClick={props.deleteTag(tag.id)}>
                    <img class="deleteimg" src="https://image.flaticon.com/icons/png/128/1345/1345823.png"></img>
              </span>  */}
          </p>

          ))}

  </div>
    );
  }


export default ShowTags;