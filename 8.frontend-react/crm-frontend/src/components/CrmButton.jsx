import React from 'react';
import '../styles/formButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'

function CrmButton(props) {

    const iconsMap  = {
        'plus': faPlus,
        'check': faCheck
    }

    return (
        <div className="button-container">
            <button className={`submit-button ${props.buttonClass}`} onClick={props.isLoading ? ()=>{} : props.callback}>
                {props.icon && <FontAwesomeIcon className='button-icon' icon={iconsMap[`${props.icon}`]} size='xs'/>}
                {props.isLoading ? 'Loading...' : props.content}
            </button>
        </div>
    );
}

export default CrmButton;