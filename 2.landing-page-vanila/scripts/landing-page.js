function validation(){

    var name = document.getElementById('name').value;
    var error = document.getElementById('error-name');
    if (!validateName(name)){
        error.textContent = "Please enter valid name";
        errorMsg(error);
        return false;
    }

    var mail = document.getElementById('mail').value;
    var error = document.getElementById('error-mail');
    if (!validateMail(mail)){
        error.textContent = "Please enter valid mail";
        errorMsg(error);
        return false;
    }

    var error = document.getElementById('error-phone');
    var phone = document.getElementById('phone').value;
    if (!validatePhone(phone)){
        error.textContent = "Please enter valid phone";
        errorMsg(error);
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

function errorMsg(error){
    error.style.display = 'inline';
    error.style.color = "red";
    return error;
}