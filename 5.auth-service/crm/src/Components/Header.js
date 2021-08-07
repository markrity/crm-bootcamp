import React from 'react'
import { useSelector } from 'react-redux'
import { generateNav } from '../scripts/navButtons'
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { logout } from "../actions/auth"




const Header = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const adminNavButtons =
        [{ title: 'Home', func: () => history.push('/home') },
        { title: 'Employees', func: () => history.push('/employees') },
        { title: "Logout", func: () => dispatch(logout()) },
        { title: "Chat", func: () => history.push('/chat') }
        ]

    const guestNavButtons =
        [{ title: 'Login', func: () => history.push('/auth/login') },
        { title: "SignUp", func: () => history.push('/auth/addNewBuisness') }]

    const employeeNavButtons =
        [{ title: 'Home', func: () => history.push('/home') },
        { title: "Logout", func: () => dispatch(logout()) }]
    const { isOnline, isLoading } = useSelector(state => state.auth)
    const { user } = useSelector(state => state.auth)
    const role = isLoading === false ? user && user.isAdmin === 1 ? "admin" : "employee" : "guest"

    const generateNav = (role) => {
        switch (role) {
            case 'admin':
                return adminNavButtons
            case 'employee':
                return employeeNavButtons
            default:
                return guestNavButtons
        }
    }

    return (
        <div id="header-bar">
            <div className="space-between">
                <div id="logo">The Wedding Planners</div>
                <ul className="nav-list">
                    {generateNav(role).map((element) =>
                        <li key={element.title} id="clickable" onClick={element.func}>
                            {element.title}
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default Header