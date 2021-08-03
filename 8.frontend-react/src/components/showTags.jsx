import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {  connectToServerPhpDelete } from "../helpers/api_helpers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBackspace} from '@fortawesome/free-solid-svg-icons';
function  ShowTags (props){

const [tagArr, setTagArr] = useState(props.tagArr);
 
useEffect(() => {
   setTagArr(props.tagArr)
   console.log(props.tagArr);
},[props.tagArr]);


let allTags = [];
if (tagArr.length) {
    allTags = tagArr.map(d => ({
       text: d.text,
       id: d.id
     })) 
}

async function deleteTag(id) {
    const params = {id}
    const response = await connectToServerPhpDelete(params, 'tags')
    if (response) {
      props.deleteTags(id)
    }
  }

return (
    
  <div className="div_tags">

{allTags.map(tag => (
          <p  id = "tag_delete"> <div className="tagsDiv">{tag.text}</div>
              <span  onClick={()=>deleteTag(tag.id)}>
              <FontAwesomeIcon icon={faBackspace} size={"1x"}/>
              </span> 
          </p>
     ))}

  </div>
    );
  }

export default ShowTags;