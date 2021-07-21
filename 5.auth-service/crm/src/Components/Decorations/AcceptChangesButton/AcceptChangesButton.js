import React from 'react'
import { ImCheckmark2 } from "react-icons/im";
import './AcceptChangesButton.scss'
const AcceptChangesButton = ({ onClickFunc, isVisible }) => {
    return (
        <>
            {isVisible && <ImCheckmark2 type="submit" className="accept-button" onClick={() => console.log("Clicked")} size={40} />}
        </>
    )
}

export default AcceptChangesButton