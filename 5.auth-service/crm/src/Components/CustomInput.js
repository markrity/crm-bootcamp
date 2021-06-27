import React from 'react'



const CustomInput = ({ type, placeholder, value, onChangeFunc, name, minLength, disabled, lbl }) => {


    return (
        <>
            <label >{lbl}
                <input
                    disabled={disabled}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={e => onChangeFunc(e)}
                    required
                    minLength={minLength ?? 1}
                />
            </label>
        </>
    )
}

export default CustomInput