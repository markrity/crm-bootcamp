import React from 'react'
import { useSelector } from 'react-redux'
import AdminNav from './adminNav'

const Header = () => {
    const { isOnline } = useSelector(state => state.auth)
    return (
        <div id="header-bar">
            <div className="space-between">
                <div id="logo">The Wedding Planners</div>
                {isOnline && <AdminNav />}
            </div>
        </div>
    )
}

export default Header