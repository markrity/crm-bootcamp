import React, { useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi";


const CustomInput = ({ placeholder, value, onChangeFunc, name, disabled, err }) => {
    const toggleVisibility = () => setIsVisible(!isVisible)
    const [isVisible, setIsVisible] = useState(false)
    const definedVars = {
        PASSWORD: "password",
        REPASSWORD: "rePassword",
        TEXT: "text"
    }
    const checkField = (name === definedVars.PASSWORD || name === definedVars.REPASSWORD)

    return (
        <div className="custom-input" >
            <div className="flex-row centered">
                <div id={checkField ? "icon" : null}>
                    {checkField ?
                        isVisible ? <FiEye onClick={toggleVisibility} size={30} /> :
                            <FiEyeOff onClick={toggleVisibility} size={30} /> : null}
                </div>
                <input className="init-form-input-length"
                    disabled={disabled}
                    type={checkField ? isVisible ? definedVars.TEXT : definedVars.PASSWORD : null}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={e => onChangeFunc(e)}
                />
            </div>
            <p id="err">{err}</p>
        </div >
    )
}

export default CustomInput