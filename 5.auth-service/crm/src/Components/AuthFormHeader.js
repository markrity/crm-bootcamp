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
        else if (mode === "Forgot Password") {
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
    }

    return (
        <>
            {view()}
        </>
    )

}

export default AuthFormHeader