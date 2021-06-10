function validateForm() {

    var fullName = document.forms["customDetailsForm"]["fullName"].value;
    var email= document.forms["customDetailsForm"]["email"].value;
    var phoneNumber= document.forms["customDetailsForm"]["phoneNumber"].value;
    var fullNameRegex= /^([a-z]{2,}\s{0,1}){1,}$/i;
    var emailRegex= /^[a-z0-9]{1,}@[a-z0-9]{1,}.[a-z0-9]{1,}$/i
    var phoneRegex= /^[0-9]{10}$/i;
    var result=fullNameRegex.test(fullName);
    var errorMsg="";
    if(result==false)
    {
        errorMsg+="-The name input is not match,please insert it again.\n";
    }
    result=emailRegex.test(email);
    if(result==false)
    {
        errorMsg+="-The email input is not match,please insert it again.\n";
    }
    result=phoneRegex.test(phoneNumber);
    if(result==false)
    {
        errorMsg+="-The phone number input is not match,please insert it again.\n";
    }
    if(errorMsg=="")
    {
        alert("Submit successfully");
    }
    
    else{
        alert(errorMsg);
    }
}