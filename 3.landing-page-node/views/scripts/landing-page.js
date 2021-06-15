function validation(){
    if(!isValidateField('name', 'error-name')){
        return false;
    }
    
    if(!isValidateField('mail', 'error-mail')){
        return false;
    }
    
    if(!isValidateField('phone', 'error-phone')){
        return false;
    }
    return true;
    // var isValid = !isValidateField('name', 'error-name');
    // isValid &= !isValidateField('mail', 'error-mail');
    // isValid &= !isValidateField('phone', 'error-phone');
    // return !isValid
}

function isValidateField(elementName, error){
    var error = document.getElementById(error);
    var content = document.getElementById(elementName).value;
    var text;
    var isValid;
    if(elementName == 'name'){
        text = "Please enter valid name";
        isValid = validateName(content);
    } else if(elementName == 'mail'){
        text = "Please enter valid mail";
        isValid = validateMail(content);
    } else if(elementName == 'phone'){
        text = "Please enter valid phone";
        isValid = validatePhone(content);
    }
    if (!isValid){
        error.textContent = text;
        error.style.display = 'inline';
        error.style.color = "red";
        return false;
    }
    return true;
}

function validateName(name){
    var regex = /^([a-zA-Z]{2,20}\s{0,1}){1,3}$/;
    return regex.test(name);
}

function validatePhone(phone){
    var regex = /^[0-9]{3}[-]{0,1}[0-9]{3}[-]{0,1}[0-9]{4}$/;
    return regex.test(phone);
}

function validateMail(mail){
    var regex = /^[0-9a-zA-Z-_.]{1,30}@[a-zA-Z]{2,30}[.]{1}[a-zA-Z]{2,30}([.]{1}[a-zA-Z]{2,30}){0,1}$/;
    return regex.test(mail);
}


function cancelError(element){
    var elementName = element.name;
    var error;
    if(elementName == 'name'){
        error  = document.getElementById('error-name');
    } else if (elementName == 'mail'){
        error  = document.getElementById('error-mail');
    } else if (elementName == 'phone'){
        error  = document.getElementById('error-phone');
    }
    error.style.display = 'none';
}
