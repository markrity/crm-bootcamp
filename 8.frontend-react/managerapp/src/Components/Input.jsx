import React from 'react';

function Input(props) {
    return (
        <input
            type={props.inputType} 
            name={props.inputName}
            id={props.inputName}
         />
    );
}

export default Input;