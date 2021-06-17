const onSubmit = (e) => {

    e.preventDefault()

    let fullName = document.getElementById('fullName').value
    let email = document.getElementById('email').value
    let phoneNumber = document.getElementById('phone').value
    if (validateValues(fullName, email, phoneNumber)) {

        var currentNode = document.getElementById('lead-form');
        var newNode = document.createElement('form');
        newNode.id = 'form2';
        newNode.innerHTML = `<h1 class="centered">We'll Contant You Shortly!</h1>`
        // Replace the current node with the new node
        currentNode.replaceWith(newNode);
    }
    else
        document.getElementById('form-err').innerHTML = 'Please Check Your Credentials '
}

const validateValues = (fullName, email, phone) => {
    return validateName(fullName) && validateEmail(email) && validatePhone(phone)
}

const validateName = (fullName) => {
    console.log(fullName)
    var regex = /^([a-zA-Z]{2,20}\s{0,1}){1,3}$/;
    return fullName.match(regex);

}
const validateEmail = (email) => {
    var regex = /^[0-9a-zA-Z-_.]{1,30}@[a-zA-Z]{2,30}[.]{1}[a-zA-Z]{2,30}([.]{1}[a-zA-Z]{2,30}){0,1}$/;
    return email.match(regex)
}

const validatePhone = (phoneNumber) => {
    var regex = /^[0-9]{10}$/;
    return phoneNumber.match(regex)
}
