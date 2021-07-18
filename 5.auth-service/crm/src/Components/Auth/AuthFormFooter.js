import React from 'react'
import ClickableTxt from '../ClickableTxt'
import { useHistory } from 'react-router-dom';
import HR from '../HR';
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from 'react-redux';
const nonClickable = ['Already Have An Account? ', 'Dont Have An Account? ']
const labels = [` Log in`, `Lets Signup`, 'Forgot My Password']

const FormFooter = ({ setFormStage, formStage, mode, func }) => {
    const history = useHistory()
    const footerButtons = () => {
        switch (mode) {
            case 'New Event':
                switch (formStage) {
                    case 0:
                        return

                        break;
                    case 1:

                        break;
                    default:
                        break
                }
                break;
            case 'New Buisness':
                return formStage === 0 ?
                    <button type="submit">Add My Buisness</button> :
                    <button type="submit">Register</button>
            case 'Remove Employee':
                return (
                    <div className="flex-row">
                        <button onClick={func}>No</button>
                        <button type="submit">Yes</button>
                    </div>
                )
            case 'Employee Removed':
                return null
            case 'Login':
                return <button type="submit">Login</button>
            case 'Reset Password':
                return <button type="submit">Send Email</button>
            case 'Change Password':
                return <button type="submit">Submit New Password</button>
            case 'Invite Employee':
                return <button type="submit">Send Email</button>
            case 'Employee Registration':
                return <button type="submit">Register</button>
            case 'Edit Employee':
                return <button type="submit">Edit Changes</button>
            default:
                return null
        }
    }

    const footerText = () => {
        switch (mode) {
            case 'New Buisness':
                return (
                    formStage === 0 ? <ClickableTxt txt={nonClickable[0]}
                        clickabletxt={labels[0]} onClickFunc={() => history.push('/auth/login')} /> :
                        <ClickableTxt clickabletxt="Back" onClickFunc={() => setFormStage(formStage - 1)} />
                )
            case 'Login':
                return (
                    <>
                        <ClickableTxt txt={nonClickable[1]}
                            clickabletxt={labels[1]} onClickFunc={() => history.push('/auth/addNewBuisness')} />
                        <ClickableTxt clickabletxt={labels[2]} onClickFunc={() => history.push('/auth/resetPassword')} />
                    </>
                )
            case 'Reset Password':
                return <ClickableTxt clickabletxt="Back" onClickFunc={() => history.goBack()} />
            case 'Verification':
                return <ClipLoader color={'blue'} loading={true} size={140} />
            default:
                return null
        }
    }

    return (
        <>
            {footerButtons()}
            {mode !== 'Edit Hall' && <HR />}
            {footerText()}
        </>

    )
}

export default FormFooter