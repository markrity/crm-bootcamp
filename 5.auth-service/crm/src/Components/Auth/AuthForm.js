import React, { useEffect, useState } from 'react'
import CustomInput from './CustomInput';
import FormFooter from './AuthFormFooter';
import {
    addBuisness, login, forgotPassword, changePassword, addNewEmployee, cleanErr,
    checkBuisnessName, setErr,
} from '../../actions/auth';
import {
    removeEmployee, inviteEmployee, editEmployee, editHall,
    removeHall, addHall
} from '../../actions/buisness'
import FormHeader from './AuthFormHeader';
import validateInfo, { checkPasswordStrength } from '../../scripts/validateInfo';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ClipLoader from "react-spinners/ClipLoader";
import AuthFormBody from './AuthFormBody';
import CustomMonthlyCalendar from '../CustomMonthlyCalendar';

const PASSWORDS_NOT_MATCH = "Your Passwords Does Not Match"

const AuthForm = ({ mode, setMode, formFields, closeModal, employeeID, initValues, hallID, initFormStage }) => {
    let buisnessTimeOutFunc
    const [timeoutID, setTimeoutID] = useState()
    const { buisnessID } = useSelector(state => state.buisness)

    const token = new URLSearchParams(window.location.search).get("token");
    const email = new URLSearchParams(window.location.search).get("email")
    const buisnessIDParam = new URLSearchParams(window.location.search).get("buisnessID")

    const dispatch = useDispatch()
    const history = useHistory()
    const [formStage, setFormStage] = useState(0)
    const [formData, setFormData] = useState(formFields);
    let { err, approvedTxt, isLoading } = useSelector(state => state.auth)
    let fieldsTemp

    useEffect(() => {
        async function wait() {
            await (isLoading === false)
        }
        wait()
        if (initValues) {
            fieldsTemp = { ...formFields }
            Object.entries(fieldsTemp).forEach((fieldArr) => {
                const field = fieldArr[1]
                field.value = initValues[fieldArr[0]]
            })
        }
    }, [])


    useEffect(() => {
        dispatch(cleanErr())
        setFormData(formFields)
    }, [formStage])

    const formFieldsCopy = formFields
    let formArray = []
    const fieldsToIterate = mode === 'New Buisness' ?
        formFieldsCopy[formStage] : formFieldsCopy

    Object.entries(fieldsToIterate).forEach((fieldArr) => {
        console.log('fieldArr', fieldArr)
        const field = fieldArr[1]
        formArray.push(<CustomInput
            key={field.name}
            type={field.type}
            placeholder={field.placeholder}
            name={field.name}
            lbl={field.lbl}
            value={field.value}
            err={field.err}
            strength={field.strength}
            onChangeFunc={e => onChange(e)}
        />)
    })


    const setValue = (key, value) => {
        clearTimeout(timeoutID)
        fieldsTemp = { ...formData };
        if (mode === 'New Buisness') {
            fieldsTemp[formStage][key].value = value
            fieldsTemp[formStage][key].err = ""
            if (key === "buisnessName") {
                if (value === "")
                    dispatch(cleanErr())
                else
                    setTimeoutID(setTimeout(() => {
                        dispatch(checkBuisnessName(value))
                    }, 400))
            }
            if (key === "password") {
                dispatch(cleanErr())
                if (value.length >= 6)
                    fieldsTemp[formStage][key].strength = checkPasswordStrength(value)
                else
                    fieldsTemp[formStage][key].strength = ""
            }
        }
        else {
            fieldsTemp[key].value = value;
            fieldsTemp[key].err = "";
        }
        setFormData(fieldsTemp)
    };

    const onChange = e => setValue(e.target.name, e.target.value)

    const footer = () => {
        return (
            <FormFooter func={closeModal} formStage={formStage}
                setFormStage={setFormStage} mode={mode} setMode={setMode} formData={formData} />
        )
    }
    const header = () => {
        return (
            <FormHeader mode={mode} formStage={formStage} />
        )
    }

    const body = () => {
        return (
            <div className="full-width">
                <CustomMonthlyCalendar />
            </div>
        )
    }

    const onSubmit = e => {
        e.preventDefault()
        const { form, hasErrors } = validateInfo(formData, mode, formStage)
        if (hasErrors)
            return setFormData(form)
        switch (mode) {
            case 'New Event':
                console.log("Saved Hall")
                switch (formStage) {
                    case 0:
                        console.log("Saved Hall")
                        setFormStage(formStage + 1)
                        break;
                    case 1:

                        break;
                    default:
                        break
                }
                break;
            case 'Remove Hall':
                console.log('Remove Hall')
                dispatch(removeHall(hallID, buisnessID))
                if (err === "")
                    closeModal()
                break
            case 'New Buisness':
                if (formStage === 0) {
                    if (err === "")
                        setFormStage(formStage + 1)
                }
                else {
                    const { password, rePassword } = formData[1]
                    if (password.value === rePassword.value)
                        dispatch(addBuisness(form))
                    else
                        dispatch(setErr(PASSWORDS_NOT_MATCH))
                }
                break;
            case 'Login':
                dispatch(login(form))
                break
            case 'Add Hall':
                dispatch(addHall(buisnessID, form))
                break
            case 'Reset Password':
                dispatch(forgotPassword(form))
                break;
            case 'Change Password':
                dispatch(changePassword({ form, token }))
                history.push('/auth/login')
                break
            case 'Invite Employee':
                dispatch(inviteEmployee(form, buisnessID))
                break
            case 'Remove Employee':
                dispatch(removeEmployee(employeeID, buisnessID))
                if (err === "")
                    closeModal()
                break;
            case "Employee Registration":
                dispatch(addNewEmployee(form, buisnessIDParam, email))
                break
            case 'Edit Employee':
                dispatch(editEmployee(employeeID, form, buisnessID))
                break
            case 'Edit Hall':
                console.log(hallID)
                dispatch(editHall(form, hallID, buisnessID))
            default:
                return
        }
    }


    return (
        <div className='centered full-width full-height'>
            <div className={mode === "New Event" ? 'left-side full-width' : 'left-side'}>
                {header()}
                <form id="init-form" className={"full-width"} onSubmit={(e) => onSubmit(e)}>
                    {formArray}
                    {mode === "New Event" ? formStage === 0 ? body() : null : null}
                    {footer()}
                    {isLoading &&
                        <ClipLoader color={'blue'} loading={true} size={140} />
                    }
                    <div id="err">{err}</div>
                    {formStage === 0 && <div id="approved">{approvedTxt}</div>}
                </form>
            </div>
        </div>
    )
}

export default AuthForm