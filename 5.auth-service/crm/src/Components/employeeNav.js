import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { logout } from '../actions/auth'

const EmployeeNav = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const navTitleArr = [{ title: 'Home', func: () => history.push('/home') },
    { title: "Logout", func: () => dispatch(logout()) }]


    return (
        <ul className="nav-list">
            {navTitleArr.map((element) => <li key={element.title} id="clickable" onClick={element.func}>{element.title}</li>)}
        </ul>
    )

}

export default EmployeeNav