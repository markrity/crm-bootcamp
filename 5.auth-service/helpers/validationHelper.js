
const validate = (type, isRequired, value) => {
    if (isRequired && !value){
        return false;
    }


    switch (type) {
        case 'mail':
           return validateMail(value);
            break;
        case 'password':
            return validatePassword(value);
            break;
        case 'phone':
            return validatePhone(value);
        case 'name':
        default:
            return validateName(value);
    }

}

export default validate; 

/**
 * @param {string} password 
 * @returns true if the password is valid.
 */
function validatePassword(password){
    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    return regex.test(password);
}


/**
 * @param {string} name 
 * @returns true if the name is valid.
 */
 function validateName(name){
    var regex = /^([a-zA-Z]{2,20}\s{0,1}){1,3}$/;
    return regex.test(name);
}

/**
 * @param {string} phone 
 * @returns true if the phone is valid.
 */
function validatePhone(phone){
    var regex = /^[0-9]{3}[-]{0,1}[0-9]{3}[-]{0,1}[0-9]{4}$/;
    return regex.test(phone);
}

/**
 * @param {sting} mail 
 * @returns true if the mail is valid.
 */
function validateMail(mail){
    var regex = /^[0-9a-zA-Z-_.]{1,30}@[a-zA-Z]{2,30}[.]{1}[a-zA-Z]{2,30}([.]{1}[a-zA-Z]{2,30}){0,1}$/;
    return regex.test(mail);
}