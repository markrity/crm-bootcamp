import React from 'react'
import './Contact.scss'
//
const Contact = ({ name, isLoggedIn, lastTxt, date, isSelected, setSelected, isTyping }) => {
    console.log(lastTxt)
    return (
        <div className={`contact ${isSelected && 'selected-contact'}`} onClick={setSelected}>
            <div className="flex-col full-width">
                <div className="flex-row full-width spaced">
                    {name}
                    <div className="date">{date}</div>
                </div>
                <div className="flex-row centered full-height flex-start">
                    <div className={`${isLoggedIn ? 'green ' : 'red '}circle`} />
                    {isTyping ? "Typing..." : lastTxt ? lastTxt : "No Messages To Show"}
                </div>
            </div>



        </div>
    )
}

export default Contact