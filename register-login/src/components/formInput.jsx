import React from "react";

function FormInput(props) {

    return (
    <div >
        <label className="label" >{props.label}</label>
        <input
        type={props.type}
        className={props.className}
        placeholder={props.placeholder}
        onChange={props.onChange} />
    </div>
    );
}


export default FormInput;