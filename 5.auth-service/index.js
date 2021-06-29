const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
var mysql = require('mysql');
var md5 = require('md5');
const jwt = require('jsonwebtoken');
var mailgun = require('mailgun-js')({apiKey:process.env.API_KEY,domain:process.env.DOMAIN})
const secret = "jdfkshfglhslffglshlf"


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Project"
});

var cors = require('cors')
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());
app.use(myLogger);


function myLogger(req, res, next) {
  if (req.originalUrl=== '/login' || req.originalUrl==='/register' || req.originalUrl==='/reset' || req.originalUrl==='/change' ) {
    next();
  } 
  else {
  var {token} = req.body;
  jwt.verify(token, secret, (err) => {
    if (err) {
      return res.json({status:false});
    }
    return res.json({status:true});
  });
}
};
module.exports = myLogger;

app.get('/', function(req, res) {
  res.send('hello there');
});

app.post('/register', function(req, res) {   
  var {full_name,business_name,mail,phone,password} = req.body;
  var valid = {
    name_valid: true,
    mail_valid: true,
    phone_valid: true,
    password_valid :true
  };
  
  if (!validateEmail(mail)){
    valid.mail_valid = false;
    
  }
  if (!validatePhone(phone)){
    valid.phone_valid = false;
  }

  if (!validatePassword(password)){
    valid.password_valid = false;
  }
 
  if (!validateName(full_name)){
    valid.name_valid = false;
  }

  if (!(valid.name_valid && valid.password_valid && valid.mail_valid && valid.phone_valid)) {
    res.json({status:2,email_validate:valid.mail_valid, phone_validate:valid.phone_valid, password_validate:valid.password_valid, name_validate:valid.name_valid});
    console.log('hi')
  }

  else {
  //check if the user is already exist 
  var isExist = `SELECT * FROM users WHERE (user_mail = '${mail}')`

  con.query(isExist, function (err, result) {
    //  console.log(result)
      if (result!=0) {
        res.json({status:0});
      }
      else {
      password=(md5(password));
      var sql = `INSERT INTO main_account (user_fullname, user_businessname, user_mail, user_phone, user_password) VALUES ('${full_name}', '${business_name}','${mail}', '${phone}', '${password}')`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        var user = `INSERT INTO users (account_id, user_fullname, user_mail, user_phone, user_password) VALUES ('${result.insertId}', '${full_name}','${mail}', '${phone}', '${password}')`;
        con.query(user, function (err, result_user) {
          if (err) throw err;
          const bodyJWT = {
            "user_id":result_user.insertId,
            "account_id": result.insertId,
            "user_fullname":full_name
          }
    
          const accessToken = jwt.sign(bodyJWT, secret)
         
          res.json({status:1, accessToken});
    
        });
      });
    }
    });
  }


});

app.post('/login', function(req, res) {   
 // console.log(req.body)
  var {mail,password} = req.body;
  password=(md5(password));
  var isExist = `SELECT * FROM users WHERE (user_mail = '${mail}') AND (user_password = '${password}') `

  con.query(isExist, function (err, result) {
  //  console.log(result)
    if (result==0) {
      res.json({status:false});
    }
    else {

      const bodyJWT = {
        "user_id":result[0].user_id,
        "account_id": result[0].account_id,
        "user_fullname":result[0].full_name
      }

      const accessToken = jwt.sign(bodyJWT, secret)
     // console.log(accessToken);
      res.json({accessToken, status:true});

    }
  });
 
});

app.post('/ping', function(req, res) {   
});

app.post('/reset', function(req, res) {   
  var {mail} = req.body;
  var isExist = `SELECT * FROM users WHERE (user_mail = '${mail}') `

  con.query(isExist, function (err, result) {
  //  console.log(result)
    if (result==0) {
      res.json({status:false});
    }
    else {
      console.log(process.env.API_KEY)
      var data = {
        from: 'neta.carmiel@workiz.com',
        to: mail,
        subject: 'Hello',
        html: `http://localhost:3000/change/${mail}`,
      };

      console.log(mail)
      mailgun.messages().send(data, function (error, body) {
        console.log(body);
      });
    
      res.json({status:true});
    }
  });
});

app.post('/change', function(req, res) {   
   var {mail,password} = req.body;
   password=(md5(password));
   var isExist = `UPDATE users SET user_password = '${password}' WHERE user_mail = '${mail}' `
   con.query(isExist, function (err, result) {
     if (err) {
       console.log(err)
        res.json({status:false});
     }
     else {
      res.json({status:true});
     }
   });
  
 });

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




app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});