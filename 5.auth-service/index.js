const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
var mysql = require('mysql');
var md5 = require('md5');
const jwt = require('jsonwebtoken');
var mailgun = require('mailgun-js')({apiKey:process.env.API_KEY,domain:process.env.DOMAIN})
const secret = process.env.SECRET

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
  //TODO loop on objects 
  if (req.originalUrl=== '/login' || req.originalUrl==='/register' || req.originalUrl==='/reset' || req.originalUrl==='/getAllUsers' || req.originalUrl==='/register:id') {
    next();
  } 
  else {
  console.log('this is middlware checking!!!!');
  var token = req.body.token;
  jwt.verify(token, secret, (err) => {
    if (err) {
      console.log(err);
      return res.json({status:false});
    }
    else {
     console.log('ma haloz');
      next();
      return res.json({status:true});
    }
  });
}
};

module.exports = myLogger;


app.get('/', function(req, res) {
  res.send('hello there');
});

app.post('/register', async (req, res) => {   
  var {full_name,business_name,email,phone,password, isNew, token} = req.body;
  console.log(req.body);
  var flag = false;
 
  if (isNew) {
    const accessToken = await insertNewUser(full_name, phone, password, token);
    res.json({status:1, accessToken});
  }

  else {
  var valid = {
    'name_validate': validateName(full_name),
    'email_validate': validateEmail(email),
    'phone_validate': validatePhone(phone),
    'password_validate' :validatePassword(password)
  };
 
  Object.entries(valid).forEach(item => {
    if (!item[1]) {
       flag=true;                             
      }
  })

  //if there are invalid inputs
  if (flag) {
    res.json({status:2,valid});
  }

  else {
  //check if the user is already exist 
  var isExist = `SELECT * FROM users WHERE (user_mail = '${email}')`
  con.query(isExist, function (err, result) {
      if (result!=0) {
        res.json({status:0});
      }
      else {
      var sql = `INSERT INTO main_account (user_fullname, user_businessname, user_mail, user_phone, user_password) VALUES ('${full_name}', '${business_name}','${email}', '${phone}', '${md5(password)}')`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        var user = `INSERT INTO users (account_id, user_fullname, user_mail, user_phone, user_password) VALUES ('${result.insertId}', '${full_name}','${email}', '${phone}', '${md5(password)}')`;
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
}
});

function insertNewUser(full_name, phone, password, token) {
  //TODO validation for new user
   return new Promise(resolve => {
    jwt.verify(token, secret, (err,result) => {
      //maybe throw its not like return --- check this
      if (err) throw err;
      var user = `INSERT INTO users (account_id, user_fullname, user_mail, user_phone, user_password) VALUES ('${result.account_id}', '${full_name}','${result.newUser_mail}', '${phone}', '${md5(password)}')`;
      con.query(user, function (err, result_user) {
      if (err) throw err;
      const bodyJWT = {
        "user_id":result_user.insertId,
        "account_id": result.account_id,
        "user_fullname":full_name
      }
      var accessToken = jwt.sign(bodyJWT, secret)
      console.log(accessToken);
      resolve (accessToken);
    });
     });
   
   });
 
}

app.post('/login', function(req, res) {   
  var {mail,password} = req.body;
  var isExist = `SELECT * FROM users WHERE (user_mail = '${mail}') AND (user_password = '${md5(password)}')`
  con.query(isExist, function (err, result) {
    if (result==0) {
      res.json({status:false});
    }
    else {
      const bodyJWT = {
        "user_id":result[0].user_id,
        "account_id": result[0].account_id,
        "user_fullname":result[0].user_fullname
      }
      const accessToken = jwt.sign(bodyJWT, secret)
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
    if (result==0) {
      res.json({status:false});
    }
    else {
      const accessToken = jwt.sign({mail:mail}, secret, {expiresIn: '1h'});
      var data = {
        from: 'neta.carmiel@workiz.com',
        to: mail,
        subject: 'Hello',
        html: `http://localhost:3000/change/${accessToken}`,
      };

      mailgun.messages().send(data, function (error, body) {
      });
    
      res.json({status:true});
    }
  });
});

app.post('/change', function(req, res) {   
   var {mail,password} = req.body;
  //  password=(md5(password));
   jwt.verify(mail, secret, (err,result) => {
    if (err) {
    console.log(err)
      //token expird/invalid
      return res.json({status:false});
    }
    else {
      console.log(result);
      var isExist = `UPDATE users SET user_password = '${md5(password)}' WHERE user_mail = '${result.mail}' `
      con.query(isExist, function (err, result) {
        if (err) {
          console.log(err)
          //connection error!!!
           res.json({status:0});
        }
        else {
          //ok
         res.json({status:true});
        }
      });
    }
   }); 
  
 });


app.post('/addUser', function(req, res) {   
var {mail,token} = req.body;
console.log(token);
jwt.verify(token, secret, (err,result) => {
  if (err) {
    console.log(err);
  }
  else {
    const bodyJWT = {
      "account_id": result.account_id,
      "newUser_mail":mail
    }
    const accessToken = jwt.sign(bodyJWT, secret, {expiresIn: '24h'})
    //console.log(result.user_id);

    var data = {
          from: 'neta.carmiel@workiz.com',
          to: mail,
          subject: 'Hi new user!',
          html: `http://localhost:3000/register/${accessToken}`,
        };
        mailgun.messages().send(data, function (error, body) {
        });
  }
});
});


app.post('/getAllUsers', function(req, res) {   
  var {token} = req.body;
  console.log('netaaaaaa');
  console.log(token);
  jwt.verify(token, secret, (err,result) => {
    if (err) {
      console.log(err);
    }
    else {
      const account_id = result.account_id 
      console.log(account_id);
      con.query("SELECT * FROM users", function (err, result) {
        if (err) throw err;
        res.send(result);
      });
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