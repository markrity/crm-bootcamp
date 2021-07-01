import React, { useEffect, useState } from 'react'
import CustomInput from './CustomInput';
import FormFooter from './AuthFormFooter';
import { addBuisness, login, forgotPassword, changePassword } from '../actions/auth';
import FormHeader from './AuthFormHeader';
import validateInfo from '../validateInfo';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';

const AuthForm = ({ mode, setMode, formFields }) => {
    const token = new URLSearchParams(window.location.search).get("token");
    const dispatch = useDispatch()
    const history = useHistory()
    const [formStage, setFormStage] = useState(0)
    const [formData, setFormData] = useState(formFields);

    useEffect(() => {
        setFormData(formFields)
    }, [mode, formFields])

    const formFieldsCopy = formFields
    let formArray = []
    for (const [key, field] of Object.entries(mode === 'New Buisness' ? formFieldsCopy[formStage] : formFieldsCopy)) {
        formArray.push(<CustomInput key={key} type={field.type}
            placeholder={field.placeholder}
            name={field.name}
            lbl={field.lbl}
            value={field.value}
            err={field.err}
            onChangeFunc={e => onChange(e)}
        />)
    }

    const setValue = (key, value) => {
        let fieldsTemp = { ...formData };
        if (mode === 'New Buisness') {
            fieldsTemp[formStage][key].value = value
        }
        else
            fieldsTemp[key].value = value;
        setFormData(fieldsTemp)
    };


    const onChange = e => setValue(e.target.name, e.target.value)


    const footer = () => {
        return (
            <FormFooter formStage={formStage} setFormStage={setFormStage} mode={mode} setMode={setMode} formData={formData} />
        )
    }

    const header = () => {
        return (
            <FormHeader mode={mode} />
        )
    }

    const onSubmit = e => {
        e.preventDefault()
        console.log("On Submit")
        const { form, hasErrors } = validateInfo(formData, mode, formStage)
        if (hasErrors)
            return setFormData(form)
        console.log('hasErrors', hasErrors)
        switch (mode) {
            case 'New Buisness':
                formStage === 0 ? setFormStage(formStage + 1) : dispatch(addBuisness(form))
                history.push('/')
                break;
            case 'Login':
                dispatch(login(form))
                break
            case 'Reset Password':
                dispatch(forgotPassword(form))
                break
            case 'Change Password':
                dispatch(changePassword({ form, token }))
                history.push('/auth/login')
                break
            default:
                return
        }
    }


    return (
        <div className='centered'>
            <div className='left-side'>
                {header()}
                <form onSubmit={(e) => onSubmit(e)}>
                    {console.log(formArray)}
                    {formArray}
                    {footer()}
                </form>
            </div>
        </div>
    )
}

export default AuthForm