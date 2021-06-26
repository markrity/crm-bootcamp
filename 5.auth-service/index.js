const express = require('express');
const app = express();

var mysql = require('mysql');
var md5 = require('md5');
const jwt = require('jsonwebtoken');

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

app.get('/', function(req, res) {
  res.send('hello there');
});

app.post('/register', function(req, res) {   
  var {full_name,business_name,mail,phone,password} = req.body;
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
      console.log(accessToken);
      res.json({accessToken});

    });
  });
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

// app.post('/ping', function(req, res) {   
//    var {jwt_check} = req.body;
//  });

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});