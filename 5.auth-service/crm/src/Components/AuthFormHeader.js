import React from 'react'
import AuthForm from './AuthForm'

const AuthFormHeader = ({ mode }) => {

    const view = () => {
        if (mode === 'addNewBuisness') {
            return (
                <div className="centered">
                    <h1>Wellcome To TheWeddingPlanners.com</h1>
                    <h2>Let’s get started with a few simple steps</h2>
                </div>
            )
        }
        else {
            return (
                <div className="centered">
                    <h1>Wellcome Back!</h1>
                    <h2>Let’s Get To It</h2>
                </div>
            )
        }
    }

    return (
        <>
            {view}
        </>
    )

}

export default AuthFormHeader