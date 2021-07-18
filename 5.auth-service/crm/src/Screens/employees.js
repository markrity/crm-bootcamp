import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployees } from '../actions/buisness'
import { inviteEmployeeFields, editUserFields } from "../scripts/formFields"
import AuthForm from '../Components/Auth/AuthForm'
import Header from '../Components/Header'
import Table from '../Components/table'
import { FcApproval } from "react-icons/fc";
import { BsFillTrashFill } from "react-icons/bs";
import { removeEmployee, addEmployee } from "../actions/buisness"
import { FaPencilAlt } from "react-icons/fa";
import CustomModal from '../Components/Containers/CustomModal/CustomModals'
import SideNavBar from '../Components/SideNavBar'

const Employees = () => {
    const [isAddVisible, setIsAddVisible] = useState(false)
    const [deleteModalVisible, setDelModalVisible] = useState(false)
    const [isEditVisible, setIsEditVisible] = useState(false)
    const [userId, setUserId] = useState(0)
    const [userFields, setUserFields] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getEmployees())
    }, []);

    const addEmployeeBtn = () => {
        return (
            <button id="change-padding-undo-margin-bottom" onClick={() => setIsAddVisible(true)}> Add Employee</button >
        )
    }

    const columns = useMemo(
        () => [
            {
                Header: "First name",
                accessor: "firstName",

            },
            {
                Header: "Last name",
                accessor: "lastName",
            },
            {
                Header: "Phone number",
                accessor: "phoneNumber",
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
                Cell: ({ row }) => <div className="flex-row spaced-between">
                    <BsFillTrashFill id="clickable" size={20} onClick={() => {
                        setUserId(row.original.id)
                        setDelModalVisible(true)
                    }} />
                    <FaPencilAlt id="clickable" size={20} onClick={() => {
                        setUserId(row.original.id)
                        setUserFields(row.original)
                        setIsEditVisible(true)
                    }} />
                </div>
            }
        ],
        []
    )
    const employees = useSelector(state => state.buisness.employees)
    const inviteModal = () => <AuthForm mode='Invite Employee'
        formFields={inviteEmployeeFields} />
    const deleteModal = () => <AuthForm employeeID={userId} mode='Remove Employee'
        closeModal={() => setDelModalVisible(false)} formFields={[]} />
    const editModal = () => < AuthForm initValues={userFields} employeeID={userId} mode="Edit Employee"
        closeModal={() => setIsEditVisible(false)} formFields={editUserFields} />
    return (
        <>
            <Header />
            <div className="flex-row">
                <SideNavBar />
                <div className="centered">
                    <CustomModal isVisible={isAddVisible} setIsVisible={setIsAddVisible} body={inviteModal()} />
                    <CustomModal isVisible={deleteModalVisible} setIsVisible={setDelModalVisible} body={deleteModal()} />
                    <CustomModal isVisible={isEditVisible} setIsVisible={setIsEditVisible} body={editModal()} />
                    <Table columns={columns} data={employees} />
                </div>
            </div>
        </>
    )
}
export default Employees