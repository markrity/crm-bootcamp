import React, { useState } from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button';
import AuthForm, { } from '../Auth/AuthForm'
import DateAndLocation from '../DateAndLocation';
import { GiChurch } from "react-icons/gi";
import { BsCalendarFill } from "react-icons/bs";
import './EventForm.css'
const EventForm = () => {
    const [selected, setSelected] = useState(0)
    const buttons = [{ logo: GiChurch, logo2: BsCalendarFill }, { logo: GiChurch }, { logo: GiChurch }, { logo: GiChurch }]
    return (
        <div className="flex-row full-width">
            <div className="flex-col full-width">
                <div className="flex-row">
                    {buttons.map((element, index) => <div key={index} onClick={() => setSelected(index)}
                        className={`event-side-button  ${selected === index ? "selected" : ""}`}>
                        <element.logo size={30} />
                        {element.logo2 && <element.logo2 size={30} />}
                    </div>)}
                </div>
                <div className="event-container">
                    <AuthForm mode="New Event" formFields={[]} />
                </div>
            </div>
        </div>
    )

}

export default EventForm