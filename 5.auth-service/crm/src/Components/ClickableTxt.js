import React from 'react'



const ClickableTxt = ({ txt, clickabletxt, onClickFunc }) => {
    return (
        <div className='flex-row centered'>
            {txt}
            <div className='clickable'>
                <p onClick={onClickFunc}>{clickabletxt}</p>
            </div>
        </div >
    )
}

export default ClickableTxt
