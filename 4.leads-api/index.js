const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors())
var db = require('./db');

const mustacheExpress = require('mustache-express');

app.engine('html', mustacheExpress());
app.use(express.static('views'));
app.set('view engine', ['html']);
app.set('views', __dirname + '/views');

app.use(express.json());
//app.use(express.urlencoded());

app.get('/index', function (req, res) {
  const data = {
    logo: 'The Wedding Planners',
    nav: createNav(),
    form: createFormContant(),

  };
  res.render('index', data);
});

app.post('/send-lead', function (req, res) {
  const { fullName, email, phoneNumber } = req.body.lead
  const record = [[fullName, email, phoneNumber]]
  var sql = 'INSERT INTO leads (lead_name,lead_email,lead_phone) VALUES ?';
  let status = 200
  db.query(sql, [record], function (err, data) {
    if (err) {
      console.log(err)
      status = 500
    }
    else
      console.log("User data is inserted successfully ");
  });  // redirect to user form page after inserting the data
  res.status(status).send()
})

app.get('/admin', function (req, res) {
  const { sortBy } = req.query
  console.log(sortBy)
  var sql = `SELECT * FROM leads ORDER BY lead_name ${sortBy ?? 'ASC'}`
  let tableHeaders = ['ID', 'Name', 'Email', 'Phone Number', 'Date Submited']
  db.query(sql, function (err, sortedTable) {
    if (err)
      throw err
    const data = {
      tableHeaders,
      sortedTable
    }
    console.log(data)
    res.render('admin', data)
  });
})

app.listen(process.env.PORT || 8082, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 8082}/index`);
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