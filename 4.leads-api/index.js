const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.urlencoded( {extended: true} ));

// connecting to the db
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "",
  database: 'landingdb'
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});


/**
 * Validates the data and save the lead to the db
 */
app.post('/', function(req, res) {
  const body = req.body;
  var resData = {valid: true, errors: []}

  if(!validateName(body.fullName)){
      resData.valid = false;
      resData.errors.push( "error-name");
  }
  if(!validateMail(body.email)){
    resData.valid = false;
    resData.errors.push("error-mail");
  }
  if(!validatePhone(body.phone)){
    resData.valid = false;
    resData.errors.push("error-phone");
  }
  
  // trying to save the lead to the db
  connection.connect(function(err) {
    if (err){
      resData.valid = false;
      resData.errors.push( "error-server");
    } else {
      console.log("Connected!");
      var sql = `INSERT INTO leads (user_name, user_mail, user_phone) VALUES ('${body.fullName}', '${body.email}', ${body.phone});`;
      connection.query(sql, function (err, result) {
        if (err){
          resData.valid = false;
          resData.errors.push( "error-server");
        } else {
          console.log("1 record inserted");
        }
      });
    }
  });

  res.send(resData);
});

/**
 * @param {sting} name 
 * @returns true if the name is valid.
 */
function validateName(name){
  var regex = /^([a-zA-Z]{2,20}\s{0,1}){1,3}$/;
  return regex.test(name);
}

/**
 * @param {sting} phone 
 * @returns true if the phone is valid.
 */
function validatePhone(phone){
  var regex = /^[0-9]{3}[-]{0,1}[0-9]{3}[-]{0,1}[0-9]{4}$/;
  return regex.test(phone);
}

/**
 * @param {sting} mail 
 * @returns true if the mail is valid.
 */
function validateMail(mail){
  var regex = /^[0-9a-zA-Z-_.]{1,30}@[a-zA-Z]{2,30}[.]{1}[a-zA-Z]{2,30}([.]{1}[a-zA-Z]{2,30}){0,1}$/;
  return regex.test(mail);
}