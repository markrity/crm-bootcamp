import React, { useState } from "react";
import Select from 'react-select';
import CreatableSelect, { makeCreatableSelect } from 'react-select/creatable';
import Button from './button'
import { connectToServerPhpAdd } from "../helpers/api_helpers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt, faEdit, faPlusSquare, faSlidersH } from '@fortawesome/free-solid-svg-icons';

function AddTags(props)  {
   const [tag, setTag] = useState('')

    async function handleClick() {
        const account_id = localStorage.getItem("account_id");
        const client_id = localStorage.getItem("client_id");
        const params = {text:tag, client_id, account_id}
        const res = await connectToServerPhpAdd(params, 'tags')
        if (res) {
        console.log('added!');
        props.updateTags(tag);
        }
      }

      const options = [
        {label:"need to pay"},
        {label:"need to call"},
       
      ]


    return (
      <div className="add_tags_inside">
        <label className="label_tags">
          <CreatableSelect defaultValue={{label:"select/add tag..."}}  onChange={(e)=>setTag(e.label)}  options= {options}>  
          </CreatableSelect>
        </label>
        <button className="add_button_tags"  onClick={() => handleClick()}> Add </button>
        </div>
    );
}


export default AddTags;