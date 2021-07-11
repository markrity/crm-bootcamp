
export  function validationInput(params) {
    var valid = {
        'name_validate': validateName(params.full_name),
        'email_validate': validateEmail(params.email),
        'phone_validate': validatePhone(params.phone),
      };
    return valid;

    //   Object.entries(valid).forEach(item => {
    //     if (!item[1]) {
    //        flag=true;                             
    //       }
    //   })

    //   if (!flag) {
    //       return true;
    //   }
    //   else {
    //       return valid;
    //   }
 }
 


 
 


 function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  function validatePassword(password) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  }
  
  function validatePhone(phone) {  
    var re = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    return re.test(phone);
  }
  
  function validateName(name) {  
    var re = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/;
    return re.test(name);
  }