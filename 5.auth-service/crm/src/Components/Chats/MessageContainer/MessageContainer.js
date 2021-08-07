import React from 'react'
import './MessageContainer.scss'

const MessageContainer = ({ txt, clas, date }) => {

    return (
        <div className="flex-col">
            <span className={`${clas}-date`} >
                {date}
            </span>
            <span className={`${clas}-msg`}>
                {txt}
            </span>
        </div>

    )

}

export default MessageContainer