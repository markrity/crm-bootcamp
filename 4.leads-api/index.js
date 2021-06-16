const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.urlencoded( {extended: true} ));

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "",
  database: 'landingdb'
});

app.post('/', function(req, res) {
  const body = req.body;
  var res_data = {valid: true, errors: []}
  if(!validateName(body.fullName)){
      res_data.valid = false;
      res_data.errors.push( "error-name");
  }
  if(!validateMail(body.email)){
    res_data.valid = false;
    res_data.errors.push("error-mail");
  }
  if(!validatePhone(body.phone)){
    res_data.valid = false;
    res_data.errors.push("error-phone");
  }
  
  connection.connect(function(err) {
    if (err){
      res_data.valid = false;
      res_data.errors.push( "error-server");
    } else {
      console.log("Connected!");
      var sql = `INSERT INTO leads (user_name, user_mail, user_phone) VALUES ('${body.fullName}', '${body.email}', ${body.phone});`;
      connection.query(sql, function (err, result) {
        if (err){
          res_data.valid = false;
          res_data.errors.push( "error-server");
        } else {
          console.log("1 record inserted");
        }
      });
    }
  });

  res.send(res_data);
});


app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});

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