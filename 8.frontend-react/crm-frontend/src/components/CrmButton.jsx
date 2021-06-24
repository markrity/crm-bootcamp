import React from 'react';


function CrmButton(props) {
    return (
        <div>
            <button onClick={props.callback}>
                {props.content}
            </button>
        </div>
    );
}

export default CrmButton;