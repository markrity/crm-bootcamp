


export default function validateInfo(formData, mode, formStage) {
    let foundError = false
    console.log('formFields', formData)
    console.log('mode', mode)
    console.log('formStage', formStage)


    let funcMap = new Map()
    funcMap.set('email', {
        func: (email) => {
            const regex = /^[0-9a-zA-Z-_.]{1,30}@[a-zA-Z]{2,30}[.]{1}[a-zA-Z]{2,30}([.]{1}[a-zA-Z]{2,30}){0,1}$/;
            return (regex.test(email));
        }, msg: 'Email is not valid'
    })

    funcMap.set('password', {
        func: (password) => {
            return /^[A-Za-z]\w{7,14}$/.test(password);
        },
        msg: 'Password Must contain uppercase and number'
    })

    funcMap.set('rePassword', {
        func: (password) => {
            return /^[A-Za-z]\w{7,14}$/.test(password);
        },
        msg: 'Password Must contain uppercase and number'
    })

    funcMap.set('firstName', {
        func: (firstName) => {
            const regex = /^[a-zA-Z]{1,}$/;
            return regex.test(firstName)
        },
        msg: 'Name must contain only letters'
    })

    funcMap.set('lastName', {
        func: (lastName) => {
            const regex = /^[a-zA-Z]{1,}$/;
            return regex.test(lastName)
        },
        msg: 'Name must contain only letters'
    })

    funcMap.set('phoneNumber', {
        func: (phoneNumber) => {
            const regex = /^[0-9]{10}$/;
            return regex.test(phoneNumber)
        }, msg: 'Number is not valid'
    })

    funcMap.set('buisnessName', {
        func: (buisnessName) => {
            const regex = /^[a-zA-Z]{1,}$/;
            console.log('BuisnessName', buisnessName)
            return regex.test(buisnessName)
        }, msg: "Field is empty"
    })

    const generateError = (fieldName, value) => {
        if (!funcMap.get(fieldName).func(value)) {
            foundError = true
            return funcMap.get(fieldName).msg
        }
        return ''
    }
    let fieldsTemp = { ...formData };
    for (const [key, field] of Object.entries(mode === 'New Buisness' ? formData[formStage] : formData)) {
        if (mode === 'New Buisness') {
            fieldsTemp[formStage][key].err = generateError(key, fieldsTemp[formStage][key].value)
        }
        else
            fieldsTemp[key].err = generateError(key, fieldsTemp[key].value);
    }

    return { form: fieldsTemp, hasErrors: foundError }
}