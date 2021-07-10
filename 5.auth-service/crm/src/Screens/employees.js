import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployees } from '../actions/buisness'
import Header from '../Components/Header'
import Table from '../Components/table'
import { FcApproval } from "react-icons/fc";
import { BsFillTrashFill } from "react-icons/bs";
import { removeEmployee, addEmployee } from "../actions/buisness"
import CustomModal from '../Components/CustomModals'
import SideNavBar from '../Components/SideNavBar'

const Employees = () => {
    const [isAddVisible, setIsAddVisible] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getEmployees())
    }, []);


    const addEmployeeBtn = () => {
        return (
            <button id="change-padding-undo-margin-bottom" onClick={() => setIsAddVisible(true)}> Add Employee</button >
        )
    }

    const { buisnessID } = useSelector(state => state.buisness)
    const columns = useMemo(
        () => [
            {
                Header: "First name",
                accessor: "FirstName",

            },
            {
                Header: "Last name",
                accessor: "LastName",
            },
            {
                Header: "Phone number",
                accessor: "PhoneNumber",
            },
            {
                Header: "Email address",
                accessor: "email",
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: ({ value }) => value === "Completed" ? <FcApproval size={20} /> : value
            },
            {
                Header: addEmployeeBtn(),
                accessor: "id",
                Cell: ({ value }) => <BsFillTrashFill id="clickable" size={20} onClick={() => dispatch(removeEmployee(value, buisnessID))} />
            },
        ],
        []
    )

    const employees = useSelector(state => state.buisness.employees)

    return (
        <>
            <Header />
            <div className="flex-row">
                <SideNavBar />
                <div className="centered">
                    <CustomModal isVisible={isAddVisible} setIsVisible={setIsAddVisible} />
                    <Table columns={columns} data={employees} />
                </div>
            </div>
        </>
    )
}
export default Employees