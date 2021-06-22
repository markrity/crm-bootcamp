const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');

app.engine('html', mustacheExpress());
app.use(express.static('views'));
app.set('view engine', ['html']);
app.set('views', __dirname + '/views');

app.get('/index', function (req, res) {
  const data = {
    logo: 'The Wedding Planners',
    nav: createNav(),
    form: createFormContant(),
  };
  res.render('index', data);
});




app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});

const createNav = () => {
  const about = { title: 'About', href: '' }
  const otherEvents = { title: 'Our Latest Events', href: '' }
  const reviews = { title: 'Reviews', href: '' }
  return [about, otherEvents, reviews]
}

const createFormContant = () => {
  initHeader = 'Let Us Set Your Perfect Day'
  const nameInput = createInput("text", "fullName", "Enter Name")
  const emailInput = createInput("text", "email", "Enter Email")
  const phoneNumber = createInput("text", "phone", "Enter PhoneNumber")
  btnText = "Contact Me"
  submitedHeader = 'Please Check Your Credentials'
  return { initHeader, formFields: [nameInput, emailInput, phoneNumber], btnText, submitedHeader }
}


const createInput = (type, id, placeholder) => {
  return { type, id, placeholder }
}