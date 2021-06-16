var error_map = {
    'error-name': "Please enter valid name", 
    'error-mail':"Please enter valid mail", 
    'error-phone':"Please enter valid phone",
    'error-server': "Please try again later"
    };

function ListenToRequest(){
    var name = "hey";
    const form = document.querySelector('#form');
    form.addEventListener('submit', function(e){
        // var is_valid = validation();
        // if(!is_valid){
        //     return false;
        // } 

        e.preventDefault();
        const name = form.elements.name.value;
        const mail = form.elements.mail.value;
        const phone = form.elements.phone.value;

        axios.post('http://rgb.com:8004', {
        fullName: name,
        email: mail,
        phone: phone
        },)
        .then(function (response) {
            console.log(response);
            var validData = response.data;
            if(!validData.valid){
                for(const error of validData.errors){
                    updateError(error);
                }
                return false;
            }
            window.location.href = "http://rgb.com:8003/?name=" + name.split(" ")[0];
            return true;
        })
        .catch(function (error) {
            console.log(error);
        });

    });
}

function updateError(errorKey){
    var error_ele = document.getElementById(errorKey);
    error_ele.textContent = error_map[errorKey];
    error_ele.style.display = 'inline';
    error_ele.style.color = "red";
    if(errorKey == "error-server"){
        error_ele.style.margin = "10px 0";
    }
}

// function validation(){
//     if(!isValidateField('name', 'error-name')){
//         return false;
//     }
    
//     if(!isValidateField('mail', 'error-mail')){
//         return false;
//     }
    
//     if(!isValidateField('phone', 'error-phone')){
//         return false;
//     }
//     return true;
// }


// function isValidateField(error){
//     var error = document.getElementById(error);
//     var text;
//     var isValid;
//     if(error == 'name'){
//         text = "Please enter valid name";
//         isValid = validateName(content);
//     } else if(elementName == 'mail'){
//         text = "Please enter valid mail";
//         isValid = validateMail(content);
//     } else if(elementName == 'phone'){
//         text = "Please enter valid phone";
//         isValid = validatePhone(content);
//     }
//     if (!isValid){
//         error.textContent = text;
//         error.style.display = 'inline';
//         error.style.color = "red";
//         return false;
//     }
//     return true;
// }

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

ListenToRequest();