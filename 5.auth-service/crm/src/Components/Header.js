import React from 'react'
import { useSelector } from 'react-redux'
import AdminNav from './adminNav'
import EmployeeNav from './employeeNav'
import GuestNav from './GuestNav'
const Header = () => {
    const { isOnline } = useSelector(state => state.auth)
    const { user } = useSelector(state => state.auth)
    return (
        <div id="header-bar">
            <div className="space-between">
                <div id="logo">The Wedding Planners</div>
                {isOnline ? user && user.isAdmin === 1 ? <AdminNav /> :
                    <EmployeeNav /> : <GuestNav />}
            </div>
        </div>
    )
}

export default Header