import React from 'react'
import ClickableTxt from './ClickableTxt'
import { useHistory } from 'react-router-dom';
import HR from './HR';
const nonClickable = ['Already Have An Account? ', 'Dont Have An Account? ']
const labels = [` Log in`, `Lets Signup`, 'Forgot My Password']

const FormFooter = ({ formData, setFormStage, formStage, mode }) => {
    const history = useHistory()
    const footerButtons = () => {
        if (mode === 'New Buisness') {
            return (
                formStage === 0 ?
                    <button type="submit">Add My Buisness</button> :
                    <button type="submit">Register</button>
            )
        }
        else if (mode === 'Login') {
            return (
                <button type="submit">Login</button>
            )
        }
        else if (mode === 'Forgot Password') {
            return (
                <button type="submit">Send Email</button>
            )
        }
        else if (mode === "Change Password") {
            return (
                <button type="submit">Submit New Password</button>
            )
        }
    }

    const footerText = () => {
        if (mode === 'New Buisness') {
            return (
                formStage === 0 ? <ClickableTxt txt={nonClickable[0]} clickabletxt={labels[0]} onClickFunc={() => history.push('/login')} /> :
                    <ClickableTxt clickabletxt="Back" onClickFunc={() => setFormStage(formStage - 1)} />
            )
        }
        else if (mode === 'Login') {
            return (
                <>
                    <ClickableTxt txt={nonClickable[1]} clickabletxt={labels[1]} onClickFunc={() => history.push('/addNewBuisness')} />
                    <ClickableTxt clickabletxt={labels[2]} onClickFunc={() => history.push('/ForgotPassword')} />
                </>
            )
        }
    }

    return (
        <>
            {footerButtons()}
            <HR />
            {footerText()}
        </>

    )
}

export default FormFooter