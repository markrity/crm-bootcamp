import React, { useState } from "react";
import Select from 'react-select';
import CreatableSelect, { makeCreatableSelect } from 'react-select/creatable';
import Button from '../components/button'
import { connectToServerPhpAdd } from "../helpers/api_helpers";

function AddTags(props)  {
   const [tag, setTag] = useState('')

    async function handleClick() {
        const account_id = localStorage.getItem("account_id");
        // checkValidation({full_name: fullName, phone: phone, email: email})
         const params = {text:tag, client_id:props.client_id, account_id}
         const res = await connectToServerPhpAdd(params, 'tags')
         if (res) {
            console.log('added!');
         }
      }

      const options = [
        {label:"need to pay"},
        {label:"big client!"},
        {label:"add???"}
      ]


    return (
      <div>
        <label>
          <CreatableSelect defaultValue={{label:"select/add tag..."}}  onChange={(e)=>setTag(e.label)}  options= {options}>  
          </CreatableSelect>
        </label>
        <Button className="button" button_text="add tag" onClick={() => handleClick()} />
        </div>
    );
}


export default AddTags;