import React from 'react'



const CustomInput = ({ type, placeholder, value, onChangeFunc, name, minLength }) => {


    return (
        <>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={e => onChangeFunc(e)}
                required
                minLength={minLength ?? 1}
            />
        </>
    )
}

export default CustomInput