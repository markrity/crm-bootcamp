import React from 'react'
import { AiOutlineAppstore, AiOutlineBell, AiOutlinePlusSquare } from "react-icons/ai";
import { FaRegUser, FaRegUserCircle } from "react-icons/fa";
import { RiUserAddLine } from "react-icons/ri";
import Button from '@material-ui/core/Button';
import { IoStatsChartOutline } from "react-icons/io5";
import { BiCalendarEvent, BiCalendar } from "react-icons/bi";
import CustomTooltip from './CustomTooltip';
import { useHistory } from 'react-router';


const SideNavBar = ({ selected, setSelected }) => {
    const history = useHistory()
    const upperButtons = [{ logo: AiOutlineAppstore, onHoverTxt: "My WorkSpace", func: () => history.push('/workSpace') },
    { logo: AiOutlinePlusSquare, onHoverTxt: "Create Event", func: () => history.push('/createEvent') },
    { logo: AiOutlineBell, onHoverTxt: "Leads" }]

    const lowerButtons = [{ logo: BiCalendarEvent, onHoverTxt: "My Week" },
    { logo: BiCalendar, onHoverTxt: "Calender" },
    { logo: RiUserAddLine, onHoverTxt: "Add Employee" },
    { logo: IoStatsChartOutline, onHoverTxt: "Stats" }
    ]

    return (
        <nav>
            <div className="upper-sidebar">
                {upperButtons.map(button =>
                    <CustomTooltip key={button.onHoverTxt} title={button.onHoverTxt} func={button.func}>
                        <div className="left-navbar-logo"><button.logo id="mg-btm" size={30} color={"white"} /></div>
                        <div className={selected !== button.onHoverTxt ? "view-tooltip" :
                            "view-tooltip selected-view-indicator"}></div>
                    </CustomTooltip>)}

            </div>

            <div className="lower-sidebar">
                {lowerButtons.map(button =>
                    <CustomTooltip key={button.onHoverTxt} title={button.onHoverTxt}>
                        <button.logo id="mg-btm" size={30} color={"white"} />
                    </CustomTooltip>)}

                <FaRegUserCircle id="mg-btm" size={40} color={"white"} />
            </div>
        </nav>

    )



}

export default SideNavBar