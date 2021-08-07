import React, { useEffect } from 'react'
import Header from '../../Components/Header'
import SideNavBar from '../../Components/SideNavBar'
import CustomChat from '../../Components/Chats/CustomChat'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from '../../actions/auth'

const Chats = () => {
    return (
        <>
            <Header />
            <div className="flex-row">
                <SideNavBar />
                <CustomChat />
            </div>
        </>

    )

}


export default Chats