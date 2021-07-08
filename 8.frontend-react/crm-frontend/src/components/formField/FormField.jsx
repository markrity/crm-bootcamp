import React from 'react';
import './formField.scss';

function FormField(props) {
    var error = `error-${props.id}`;
    return (
        <div className='fieldContainer' >
            <input className='form-input' type={props.type} value={props.value} onChange={props.callback}  placeholder={props.text}/>
            <span className='field-error' id={error}>{props.errorText}</span>
        </div>
    );
}

export default FormField;
