import React from 'react'

const labels = [`I Already Have An Account`, `I Dont Have An Account, Lets Signup`]

const FormFooter = ({ isSignup, setIsSignup }) => {
    return (
        <div className='clickable'>
            <p onClick={() => setIsSignup(!isSignup)}>{isSignup ? labels[0] : labels[1]}</p>
        </div>
    )
}

export default FormFooter