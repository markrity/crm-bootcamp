import React from 'react';
import '../styles/formButton.css';

function CrmButton(props) {
    return (
        <div className="button-container">
            <button className='submit-button' onClick={props.isLoading ? ()=>{} : props.callback}>
                {props.isLoading ? 'Loading...' : props.content}
            </button>
        </div>
    );
}

export default CrmButton;