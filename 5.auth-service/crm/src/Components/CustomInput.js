import React from 'react'



const CustomInput = ({ type, placeholder, value, onChangeFunc, name, minLength, disabled, lbl, err }) => {


    return (
        <div className="custom-input">
            {/* <label htmlFor={name} >{lbl}</label> */}
            <input
                disabled={disabled}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={e => onChangeFunc(e)}
            />
            <p id="err">{err}</p>
        </div>
    )
}

export default CustomInput