import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { logout } from '../actions/auth'
import { getEmployees } from '../actions/buisness'

const AdminNav = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const navTitleArr = [{ title: 'Home', func: () => history.push('/home') },
    {
        title: 'Employees', func: () => {
            history.push('/employees')
        }
    },
    { title: "Logout", func: () => dispatch(logout()) }]
    return (
        <ul className="nav-list">
            {navTitleArr.map((element) => <li key={element.title} id="clickable" onClick={element.func}>{element.title}</li>)}
        </ul>
    )

}

export default AdminNav