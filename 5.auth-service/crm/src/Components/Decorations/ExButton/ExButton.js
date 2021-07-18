import React from 'react'
import './ExButton.scss'
import { FiXCircle } from "react-icons/fi";
const ExButton = ({ onClickFunc, isVisible, size }) => {

    return (
        isVisible ? <FiXCircle size={size ? size : 40} id="ex-button" onClick={onClickFunc} /> : null
    )
}

export default ExButton