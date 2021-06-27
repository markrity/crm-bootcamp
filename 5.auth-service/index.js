import SqlHelper from './helpers/sqlHelper.js';
import express from 'express';
import cors from 'cors';
import SessionHelper from './helpers/sessionHelper.js';
import mysql from 'mysql';
import md5 from 'md5';
import validate from './helpers/validationHelper.js';
// import user from './helpers/user.js'

const app = express();
const sessionHelper = new SessionHelper();

// var router = express.Router();
// app.use('/isConnect', authMiddleware);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const sqlHelper = new SqlHelper();


app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});

app.get('/', function (req, res) {
  res.send('hello there');
});


app.post('/signup', async function (req, res) {

  const body = req.body;
  let resData = { valid: true, errors: [] }
  
  for(let field in req.body){
    let content = req.body[`${field}`];
    if(!validate(content.type, true, content.value)){
      resData.valid = false;
      resData.errors.push(field);
    }
  }
  if(!resData.valid){
    console.log("invalid!");
    res.send(resData);
    return;
  }
  console.log("valid!");
    
    // insert the account to the db
    
    var sql = `INSERT INTO accounts (business_name, first_user_mail) VALUES ('${body.business.value}', '${body.mail.value}');`;
    let result = await sqlHelper.insert(sql).catch((err)=>{});
    if(!result){
      resData.valid = false;
      resData.errors.push("error-server");
      res.status(401).send(resData);
      return;
    }

    let account_id_value = result.insertId;

    // insert the user to the db
    var sql = `INSERT INTO users (account_id, user_name, user_password, user_mail, user_phone) VALUES ('${account_id_value}', '${body.name.value}', '${encodePassword(body.password.value)}', '${body.mail.value}', ${body.phone.value});`;

    result = await sqlHelper.insert(sql).catch((err)=>{});
    if(!result){
      resData.valid = false;
      resData.errors.push("error-server");
      res.status(401).send(resData);
      return;
    }
    const user = {user_name: body.name.value,  user_id: result.insertId, account_id: account_id_value};
    resData.accessToken = sessionHelper.createSession(user);
    resData.user_name = result.user_name;
  // }
  res.send(resData);
});

// // checking if the session is open
// app.post('/ping', function (req, res) {
//   let isValid = false;
//   console.log("hi! this is ping function");
//   var userData = sessionHelper.verifySession(req.headers.authorization)
//   console.log("userData from verified", userData);
//   if(userData && sessionHelper.isOpenSession(userData)){
//     isValid = true;
//   }
//   console.log("returning from ping: ", resData);
//   res.send(isValid);
// });

app.post('/login', async function (req, res) {
  const body = req.body;
  let resData = { valid: true, errors: [] }


  for(let field in req.body){
    let content = req.body[`${field}`];
    if(!validate(content.type, true, content.value)){
      resData.valid = false;
      resData.errors.push(field);
    }
  }
  if(!resData.valid){
    console.log("invalid!");
    res.send(resData);
    return;
  }
  console.log("valid!");
  
  
  var sql = `SELECT * FROM users WHERE user_mail = '${body.mail.value}' AND user_password = '${encodePassword(body.password.value)}' ;`;
  let result = await sqlHelper.select(sql).catch((err)=>{});
  if(!result){
    resData.valid = false;
    resData.errors.push("error-server");
    res.statusCode(401).send(resData);
    return;
  };

  if(result.length > 0){
    let userResult = result[0];      
    const user = {user_name: userResult.user_name,  user_id: userResult.user_id, account_id: userResult.account_id};
    resData.user_name = userResult.user_name;
    resData.accessToken = sessionHelper.createSession(user);

  } else {
    resData.valid = false;
    resData.errors.push("incorrect mail or password");
  }
  console.log("resData: ",resData);
  res.send(resData);
});


app.post('/logout', function (req, res) {
  let resData = { valid: false }

  var userData = sessionHelper.verifySession(req.headers.authorization);
  if(userData){
    sessionHelper.deleteSession(userData);
    resData.valid = true;
  }
  res.send(resData);
});



function encodePassword(password){
  return md5(password);
}


function authMiddleware(req, res, next){
  const userData = sessionHelper.verifySession(req.headers.authorization);
  console.log(userData)
  if(userData){
    next()
  } else {
      console.log("returns false");
      return res.send(false);
  }
}


app.get('/ping', authMiddleware,  function(req, res){
  res.send(true);
});
