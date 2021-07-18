import React from 'react'
import { AiOutlineEdit } from "react-icons/ai";
import './EditButton.scss'


const EditButton = ({ isClicked, onClickedFunc }) => {
    { console.log(isClicked) }
    return (
        <AiOutlineEdit className={`edit-button ${isClicked ? "clicked" : ""}`} onClick={onClickedFunc} size={40} />
    )
}


export default EditButton