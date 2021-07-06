import React, { useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useSelector } from 'react-redux';


const CustomInput = ({ type, placeholder, value, onChangeFunc, name, disabled, err, icon1, icon2 }) => {
    const toggleVisibility = () => setIsVisible(!isVisible)
    const [isVisible, setIsVisible] = useState(false)

    const checkField = (name === "password" || name === "rePassword")

    return (
        <div className="custom-input">
            <div className="flex-row">
                <div id={checkField ? "icon" : null}>
                    {(name === "password" || name === "rePassword") ?
                        isVisible ? <FiEye onClick={toggleVisibility} size={30} /> :
                            <FiEyeOff onClick={toggleVisibility} size={30} /> : null}
                </div>
                <input className="init-form-input-length"
                    disabled={disabled}
                    type={(name === "password" || name === "rePassword") ? isVisible ? "text" : "password" : null}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={e => onChangeFunc(e)}
                />
            </div>
            <p id="err">{err}</p>
        </div>
    )
}

export default CustomInput