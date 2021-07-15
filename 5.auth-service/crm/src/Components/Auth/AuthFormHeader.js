import React from 'react'

const AuthFormHeader = ({ mode, formStage }) => {

    const view = () => {
        switch (mode) {
            case 'New Event':
                switch (formStage) {
                    case 0:
                        return <h2>Choose A Date</h2>
                    case 1:
                        break;
                    default:
                        break
                }
            case 'New Buisness':
                return (<>
                    <h2>Wellcome To TheWeddingPlanners.com</h2>
                    Let’s get started with a few simple steps
                </>
                )
            case 'Remove Employee':
                return (
                    <div className='flex-col centered'>
                        <h2>Are You Sure?</h2>
                    </div>
                )
            case 'Login':
                return (
                    <>
                        <h2>Wellcome Back!</h2>
                        Let’s Get To It
                    </>
                )
            case 'Reset Password':
                return (
                    <div className='flex-col center-screen'>
                        <h2>Reset Password</h2>
                    </div>
                )
            case 'Change Password':
                return (
                    <div className='flex-col center-screen'>
                        <h2>Enter Your New Password</h2>
                    </div>
                )
            case 'Email Sent':
                return (
                    <div className='flex-col center-screen'>
                        <h2>An Email Was Sent</h2>
                    </div>
                )
            case 'Invite Employee':
                return (
                    <div className='flex-col center-screen'>
                        <h2>Invite An Employee</h2>
                    </div>
                )
            case 'Employee Registration':
                return <h2>Finish Registration</h2>
            case 'Edit Employee':
                return <h2 className="centered">Edit Employee Details</h2>
            case 'Verification':
                return (
                    <div className='flex-col center-screen'>
                        <h2>Verification in Prograss</h2>
                    </div>
                )
            default:
                return null
        }
    }

    return view()

}

export default AuthFormHeader