import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { logout } from '../actions/auth'

const GuestNav = () => {
    const history = useHistory()
    const navTitleArr = [{ title: 'Login', func: () => history.push('/auth/login') },
    { title: "SignUp", func: () => history.push('/auth/addNewBuisness') }]

    return (
        <ul className="nav-list">
            {navTitleArr.map((element) => <li key={element.title} id="clickable" onClick={element.func}>{element.title}</li>)}
        </ul>
    )

}

export default GuestNav