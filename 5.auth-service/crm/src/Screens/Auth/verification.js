import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Auth from '../../Components/Auth/authentication'
import { finishVerification } from '../../actions/auth'

const Verification = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get("token");
        setTimeout(() => {
            dispatch(finishVerification(token))
        }, 3000);
    }, [])
    return (
        < Auth initMode="Verification" />
    )
}

export default Verification