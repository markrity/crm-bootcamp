import React from 'react';


function FormField(props) {
    return (
        <div>
            <label>{props.text}</label>
            <input type="text" value={props.value} onChange={props.callback}/>
        </div>
    );
}

export default FormField;

// value={props.value}