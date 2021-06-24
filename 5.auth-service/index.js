import SqlHelper from './helpers/sqlHelper.js';
import express from 'express';
import cors from 'cors';

// const express = require('express');
const app = express();
// const cors = require('cors');
import mysql from 'mysql';
import md5 from 'md5';
import jwt from 'jsonwebtoken';



app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));

const openSessions = new Map();
var sessionCounter = 0;
const accessTokenSecret = 'nkjnnj5j6jkbHBVjhuyg6tgbj';

// const { query } = require('express');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "",
  database: 'landingdb'
});

var connectionValid = false;
connection.connect(function (err) {
  if (err) {
    connectionValid = false;
  } else {
    connectionValid = true;
  }
});
const sqlHelper = new SqlHelper(connection);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});

app.get('/', function (req, res) {
  res.send('hello there');
});


app.post('/signup', async function (req, res) {

  const body = req.body;
  let resData = { valid: true, errors: [] }

  // TODO Validation


  if (!connectionValid) {
    resData.valid = false;
    resData.errors.push("error-server");
  } else {
    
    // insert the account to the db
    var sql = `INSERT INTO accounts (business_name, first_user_mail) VALUES ('${body.business}', '${body.mail}');`;
    let result = await sqlHelper.insert(sql);
    let account_id_value = result.insertId;

    // insert the user to the db
    // 375Nk67
    var sql = `INSERT INTO users (account_id, user_name, user_password, user_mail, user_phone) VALUES ('${account_id_value}', '${body.name}', '${encodePassword(body.password)}', '${body.mail}', ${body.phone});`;
    //  TODO
    result = await sqlHelper.insert(sql);
    console.log("result is ", result);
    const user = {user_name: body.name,  user_id: result.insertId, account_id: account_id_value};
    console.log("signup", user.user_name);
    resData.accessToken = createSession(user);
    resData.user_name = result.user_name;
  }
  res.send(resData);
});

// checking if the session is open
app.post('/ping', function (req, res) {
  let resData = { valid: false }

  var userData = verifySession(req.headers.authorization)
  if(userData && openSessions.has(userData.session_id)){
    resData.valid = true;
  }
  res.send(resData);
});

app.post('/login', async function (req, res) {
  const body = req.body;
  let resData = { valid: true, errors: [] }

  // TODO Validation
  
  if (!connectionValid) {
    resData.valid = false;
    resData.errors.push("error-server");
    res.send(resData);
  } 

  try{
    var sql = `SELECT * FROM users WHERE user_mail = '${body.mail}' AND user_password = '${encodePassword(body.password)}' ;`;
    // var sql = `SELECT * FROM users WHERE user_mail = '${body.email}';`;
    let result = await sqlHelper.select(sql);
    if(result.length > 0){
      userResult = result[0];
      // check if the password match to the password from db
      // if(userResult.user_password !== encodePassword(body.password)){
      //   resData.valid = false;
      //   resData.errors.push("Incorrect password");
      //   res.send(resData);
      // }
      
      const user = {user_name: userResult.user_name,  user_id: userResult.user_id, account_id: userResult.account_id};
      resData.user_name = userResult.user_name;
      resData.accessToken = createSession(user);

    } else {
      resData.valid = false;
      resData.errors.push("incorrect mail or password");
    }
  } catch {
    // error
    console.log("login error");
  }
  res.send(resData);
});



// const insert = (sql) => {
//   return new Promise((resolve, reject) => {
//     connection.query(sql, function (err, result) {
//       if (err) {
//         reject("Database insertion failed");
//       } else {
//         console.log("1 record inserted");
//         resolve(result);
//       }
//     })
//   });
// }

// const select = (sql) => {
//   return new Promise((resolve, reject) => {
//     connection.query(sql, function (err, result) {
//       if (err) {
//         reject("Database selection failed");
//       // } else if (result.length = 0){
//       //   console.log("not exist!");
//       //   reject("Database selection failed");
//       // } else {
//       } else {
//         // console.log("exist!");
//         resolve(result);
//       }
//     })
//   });
// }

function createSession (user){
  console.log("creating session");
  user.session_id = sessionCounter;
  console.log(user.user_name);
  openSessions.set(sessionCounter++, user);
  const token = jwt.sign(user, accessTokenSecret, {
    "algorithm": "HS256",
    expiresIn: 86400 * 10 // expires in 10 days
  });
  return token;
}


function encodePassword(password){
  return md5(password);
}

function verifySession(accessToken){
  if(accessToken){
    return jwt.verify(accessToken, accessTokenSecret, (err, user) => {
      if (err){
        return null;
      }
      return openSessions.has(user.session_id) ?  openSessions.get(user.session_id) : null;
    });
  } 
  return null;
}

app.post('/logout', function (req, res) {
  let resData = { valid: false }

  console.log("before");
  console.log(openSessions);
  var userData = verifySession(req.headers.authorization)
  if(userData){
    console.log("logout - verified!");
    openSessions.delete(userData.session_id);
    console.log("deleted from open sessions");
    resData.valid = true;
    console.log("after");
    console.log(openSessions);
  }

  res.send("bye!");
});

//     result = await insert(sql).catch((err)=>{});
//    if (result)
// // IF FAILED
// if (false) {
//   res.statusCode(401).send("unauthorized");
// }