import React from 'react'



const ClickableTxt = ({ txt, onClickFunc }) => {
    return (
        <div className='clickable'>
            <p onClick={onClickFunc}>{txt}</p>
        </div>
    )
}

export default ClickableTxt
