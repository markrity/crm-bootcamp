import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployees } from '../actions/buisness'
import { inviteEmployeeFields } from "../scripts/formFields"
import AuthForm from '../Components/Auth/AuthForm'
import Header from '../Components/Header'
import Table from '../Components/table'
import { FcApproval } from "react-icons/fc";
import { BsFillTrashFill } from "react-icons/bs";
import { removeEmployee, addEmployee } from "../actions/buisness"
import CustomModal from '../Components/CustomModals'
import SideNavBar from '../Components/SideNavBar'

const Employees = () => {
    const [isAddVisible, setIsAddVisible] = useState(false)
    const [deleteModalVisible, setDelModalVisible] = useState(false)
    const [userId, setUserId] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getEmployees())
    }, []);

    // useEffect(() => {
    //     console.log("Effect")
    //     // setDelModalVisible(true)
    // }, [userId])

    const addEmployeeBtn = () => {
        return (
            <button id="change-padding-undo-margin-bottom" onClick={() => setIsAddVisible(true)}> Add Employee</button >
        )
    }

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
                Cell: ({ value }) => <BsFillTrashFill id="clickable" size={20} onClick={() => {
                    setUserId(value)
                    setDelModalVisible(true)
                }
                } />
            }
        ],
        []
    )

    const employees = useSelector(state => state.buisness.employees)
    const inviteModal = () => <AuthForm mode='Invite Employee'
        formFields={inviteEmployeeFields} />
    const deleteModal = () => <AuthForm employeeID={userId} mode='Remove Employee'
        closeModal={() => setDelModalVisible(false)} formFields={[]} />
    return (
        <>
            <Header />
            <div className="flex-row">
                <SideNavBar />
                <div className="centered">
                    <CustomModal isVisible={isAddVisible} setIsVisible={setIsAddVisible} body={inviteModal()} />
                    <CustomModal isVisible={deleteModalVisible} setIsVisible={setDelModalVisible} body={deleteModal()} />
                    <Table columns={columns} data={employees} />
                </div>
            </div>
        </>
    )
}
export default Employees