import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import Header from '../Components/Header'
import SideNavBar from '../Components/SideNavBar'
import 'semantic-ui-css/semantic.min.css'
import { broadcastEmail } from '../actions/buisness'
import { useDispatch } from 'react-redux'

const BroadcastEmail = () => {
    const items = ["Employees", 'Customers']
    const [header, setHeader] = useState("")
    const [body, setBody] = useState("")
    const [selected, setSelected] = useState(0)
    const dispatch = useDispatch()

    return (
        <>
            <Header />
            <div className="flex-row">
                <SideNavBar selected="Broadcast" />
                <div className="flex-col full-width mg-top ">
                    <div className="flex-row spaced-evenly  centered ">
                        <h1> Broadcast to</h1>
                        <Dropdown text={items[selected]}>
                            <Dropdown.Menu>
                                <Dropdown.Item text='Employees' onClick={() => setSelected(0)} />
                                <Dropdown.Divider />
                                <Dropdown.Item text='Customers' onClick={() => setSelected(1)} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="centered mg-top">
                        <input placeholder="Enter Email Title" style={{ width: '40%' }} type="text" value={header}
                            onChange={(e) => setHeader(e.target.value)} id="header" name="header" />
                    </div>
                    <div className="centered mg-top">
                        <textarea placeholder="Enter Email Body" style={{ width: '40%', height: '400px' }} type="text"
                            value={body}
                            onChange={(e) => setBody(e.target.value)} id="body" name="body" />
                    </div>
                    <button className="mg-top"
                        onClick={() => dispatch(broadcastEmail(items[selected], header, body))}>
                        Broadcast
                    </button>
                </div>
            </div>
        </>

    )
}


export default BroadcastEmail

