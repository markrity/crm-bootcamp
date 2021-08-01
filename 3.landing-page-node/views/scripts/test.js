  // // var slideIndex = 1;
  // showSlides(slideIndex);

function showSlides(slideIndex) {
    var slides = document.getElementsByClassName("mySlides")[0].children;
    var visibleImg =  document.querySelector(".mySlides img.visible");
    if (visibleImg) { 
       visibleImg.className = "";
    }
    slides[slideIndex-1].className = "visible";
 }


 
function validateform() {  
  var phoneNumber = document.getElementById('phone').value;
  var error = document.getElementById("error")
  var phoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  var phoneResult = phoneRGEX.test(phoneNumber);
  if (!phoneResult) {
    error.textContent = "invalid phone"
    error.style.color = "red"
    return false;
  }
  
  var firstName = document.getElementById('firstname').value;
  var lastName = document.getElementById('lastname').value;
  var NameRGEX = /^[a-zA-Z ]+$/ ;
  var firstNameResult = NameRGEX.test(firstName);
  var lastNameResult = NameRGEX.test(lastName);
  if (!firstNameResult) {
    error.textContent = "invalid first name"
    error.style.color = "red"
    return false;
  }
  if (!lastNameResult) {
    error.textContent = "invalid last name"
    error.style.color = "red"
    return false; 
  }
} 