import React from 'react'
import Header from '../Components/Header'
import SideNavBar from '../Components/SideNavBar'
import EventForm from '../Components/EventForm/EventForm'
const CreateEvent = () => {

    return (
        <>
            <Header />
            <div className="flex-row">
                <SideNavBar selected="Create Event" />
                <EventForm />
            </div>
        </>
    )
}

export default CreateEvent