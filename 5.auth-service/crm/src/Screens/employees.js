import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getEmployees } from '../actions/buisness'
import Header from '../Components/Header'

const Employees = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getEmployees())
    }, [])
    return (
        <>
            <Header />
        </>

    )
}
export default Employees