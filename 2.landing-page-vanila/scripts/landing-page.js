function validation(){
    var name = document.getElementById('name').value;
    var isValid = validateName(name);
    if (!isValid){
        alert("name: " + isValid );
        return false;
    }


    var mail = document.getElementById('mail').value;
    var mailElement = document.getElementById('mail');
    mailElement.addEventListener("input", function(event){
        mailElement.setCustomValidity("I am expecting an e-mail address!");
    })
    var isValid = validateMail(mail);
    if (!isValid){
        alert("mail: " + isValid );
        return false;
    }

    
    var phone = document.getElementById('phone').value;
    var isValid = validatePhone(phone);
    if (!isValid){
        alert("phone: " + isValid );
        return false;
    }


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
