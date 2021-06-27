import SqlHelper from './helpers/sqlHelper.js';
import express from 'express';
import cors from 'cors';
import SessionHelper from './helpers/sessionHelper.js';
import mysql from 'mysql';
import md5 from 'md5';
import validate from './helpers/validationHelper.js';

const app = express();
const sessionHelper = new SessionHelper();


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
    if(!validate(field.mainType,true,field.value)){
      resData.valid = false;
      resData.errors.push(field);
    }
  }

  if(!resData.valid){
    res.send(resData);
    return;
  }
    
    // insert the account to the db
    
    var sql = `INSERT INTO accounts (business_name, first_user_mail) VALUES ('${body.business}', '${body.mail}');`;
    let result = await sqlHelper.insert(sql).catch((err)=>{});
    if(!result){
      resData.valid = false;
      resData.errors.push("error-server");
      res.statusCode(401).send(resData);
      return;
    }

    let account_id_value = result.insertId;

    // insert the user to the db
    var sql = `INSERT INTO users (account_id, user_name, user_password, user_mail, user_phone) VALUES ('${account_id_value}', '${body.name}', '${encodePassword(body.password)}', '${body.mail}', ${body.phone});`;
    //  TODO
    result = await sqlHelper.insert(sql).catch((err)=>{});
    if(!result){
      resData.valid = false;
      resData.errors.push("error-server");
      res.statusCode(401).send(resData);
      return;
    }

    console.log("result is ", result);
    const user = {user_name: body.name,  user_id: result.insertId, account_id: account_id_value};
    console.log("signup", user.user_name);
    resData.accessToken = sessionHelper.createSession(user);
    resData.user_name = result.user_name;
  // }
  res.send(resData);
});

// checking if the session is open
app.post('/ping', function (req, res) {
  let isValid = false;
  console.log("hi! this is ping function");
  var userData = sessionHelper.verifySession(req.headers.authorization)
  console.log("userData from verified", userData);
  if(userData && sessionHelper.isOpenSession(userData)){
    isValid = true;
  }
  console.log("returning from ping: ", resData);
  res.send(isValid);
});

app.post('/login', async function (req, res) {
  const body = req.body;
  let resData = { valid: true, errors: [] }

  // TODO Validation
  
  var sql = `SELECT * FROM users WHERE user_mail = '${body.mail}' AND user_password = '${encodePassword(body.password)}' ;`;
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

  var userData = sessionHelper.verifySession(req.headers.authorization)
  if(userData){
    sessionHelper.deleteSession(userData);
    resData.valid = true;
  }
  res.send(resData);
});

function encodePassword(password){
  return md5(password);
}
