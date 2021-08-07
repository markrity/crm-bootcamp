import React, { useState } from 'react'
import Header from '../../Components/Header'
import SideNavBar from '../../Components/SideNavBar'
import SubHeader from '../../Components/WorkSpace/SubHeader/SubHeader'
import MyHalls from '../../Components/WorkSpace/MyHalls'
import { GiChurch } from "react-icons/gi";
const WorkSpace = () => {

    const [selected, setSelected] = useState("Halls")
    const buttons = [{ logo: GiChurch }]
    const selectedComponent = () => {
        return (
            <>

            </>
        )
    }
    return (
        <div className="flex-col">
            <Header />
            <div className="flex-row">
                <SideNavBar selected="My WorkSpace" />
                <div className="flex-col full-width">
                    {/* <SubHeader buttons={buttons} /> */}
                    <div className=" full-width centered full-height">
                        <MyHalls />
                    </div>
                </div>
            </div>
        </div>
    )

}
export default WorkSpace;