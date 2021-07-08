import React from 'react'
import { AiOutlineAppstore, AiOutlineBell, AiOutlinePlusSquare } from "react-icons/ai";
import { FaRegUser, FaRegUserCircle } from "react-icons/fa";
import { RiUserAddLine } from "react-icons/ri";
import Button from '@material-ui/core/Button';
import { IoStatsChartOutline } from "react-icons/io5";
import { BiCalendarEvent, BiCalendar } from "react-icons/bi";
import CustomTooltip from './CustomTooltip';
const SideNavBar = () => {
    const upperButtons = [{ logo: AiOutlinePlusSquare, onHoverTxt: "Create Event" },
    { logo: AiOutlineAppstore, onHoverTxt: "My Workplace" },
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
                    <CustomTooltip title={button.onHoverTxt}>
                        <button.logo id="mg-btm" size={30} color={"white"} />
                    </CustomTooltip>)}
            </div>

            <div className="lower-sidebar">
                {lowerButtons.map(button =>
                    <CustomTooltip title={button.onHoverTxt}>
                        <button.logo id="mg-btm" size={30} color={"white"} />
                    </CustomTooltip>)}
                <Button>
                    <FaRegUserCircle id="mg-btm" size={40} color={"white"} />
                </Button>
            </div>
        </nav>

    )



}

export default SideNavBar