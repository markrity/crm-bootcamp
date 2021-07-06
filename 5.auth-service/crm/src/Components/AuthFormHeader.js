import React from 'react'

const AuthFormHeader = ({ mode }) => {

    const view = () => {
        if (mode === 'New Buisness') {
            return (<>
                <h2>Wellcome To TheWeddingPlanners.com</h2>
                Let’s get started with a few simple steps
            </>
            )
        }
        else if (mode === "Login") {
            return (
                <>
                    <h2>Wellcome Back!</h2>
                    Let’s Get To It
                </>
            )
        }
        else if (mode === "Reset Password") {
            return (
                <div className='flex-col center-screen'>
                    <h2>Enter Email</h2>
                </div>
            )
        }
        else if (mode === "Change Password") {
            return (
                <div className='flex-col center-screen'>
                    <h2>Enter Your New Password</h2>
                </div>
            )
        }
        else if (mode === "Email Sent") {
            return (
                <div className='flex-col center-screen'>
                    <h2>An Email Was Sent</h2>
                </div>
            )
        }
        else if (mode === "Invite Employee") {
            return (
                <div className='flex-col center-screen'>
                    <h2>Invite An Employee</h2>
                </div>
            )
        }
        else if (mode === "Employee Registration")
            return <h2>Finish Registration</h2>
        else if (mode === "Verification") {
            return (
                <div className='flex-col center-screen'>
                    <h2>Verification in Prograss</h2>
                </div>
            )
        }
        else if (mode === "Loading") {

        }
    }

    return (
        <>
            {view()}
        </>
    )

}

export default AuthFormHeader