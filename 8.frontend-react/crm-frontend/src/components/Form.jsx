// import React from 'react';
import React, { useState, useEffect } from 'react';
import FormField from './FormField';
import CrmButton from './CrmButton';


function Form(props) {

    const [fields, setFields] = useState(props.fields);
    
    useEffect(() => {
        setFields(props.fields);
    }, [props.fields])

    const setValue = (key, value) => {
        const fieldsTemp = {...fields};
        fieldsTemp[key].value = value;
        setFields(fieldsTemp);
    };

    const submit = () => {
        let data = {};
        for(let key in fields){
            data[`${key}`] = fields[`${key}`].value;
        }
        console.log(data);
        // validation
        props.submitHandle(data);
    };

    const fieldsComponents = [];
    // console.log(fields);
    // for (let fieldKey in props.fields){
    //     const content = fields[`${fieldKey}`];
    //     console.log(content);
    //     fieldsComponents.push(<FormField text={content.text} key={`${content.id}`} callback={(e)=> setValue(fieldKey, e.target.value)}/>);
    // }
    for (let fieldKey in fields){
        const content = fields[`${fieldKey}`];
        fieldsComponents.push(<FormField text={content.text} value={content.value || ''} key={`${props.type}${content.id}`} callback={(e)=> setValue(fieldKey, e.target.value)}/>);
    }

    return (

        <div>
            <h2>{props.title}</h2>
            {fieldsComponents}
            <CrmButton content="submit" callback={()=> submit()}/>
        </div>
    );
}

export default Form;
