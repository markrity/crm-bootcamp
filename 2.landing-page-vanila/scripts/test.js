var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "flex";
    dots[slideIndex-1].className += " active";
    captionText.innerHTML = dots[slideIndex-1].alt;
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