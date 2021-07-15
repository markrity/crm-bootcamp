import React, { useState } from 'react'
import './SubHeader.scss';


const SubHeader = ({ buttons }) => {
    const [selected, setSelected] = useState(0)
    return (
        <div className="flex-row">
            {buttons.map((element, index) => <div key={index} onClick={() => setSelected(index)}
                className={`event-side-button  ${selected === index ? "selected" : ""}`}>
                <element.logo size={30} />
                {element.logo2 && <element.logo2 size={30} />}
            </div>)}
        </div>
    )
}

export default SubHeader