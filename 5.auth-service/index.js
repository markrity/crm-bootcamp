import SqlHelper from './helpers/sqlHelper.js';
import express from 'express';
import cors from 'cors';
import SessionHelper from './helpers/sessionHelper.js';
import md5 from 'md5';
import validate from './helpers/validationHelper.js';
import MailgunHelper from './helpers/mailgunHelper.js'
import dotenv from 'dotenv';
import MailGun from 'mailgun-js';

const app = express();
const sessionHelper = new SessionHelper();
const sqlHelper = new SqlHelper();
const mailgunHelper = new MailgunHelper();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});

app.get('/', function (req, res) {
  res.send('hello there');
});

/**
 * Inserts new user and account to the db and adds the new jwt token to the response.
 */
app.post('/signup', async function (req, res) {

  const body = req.body;
  let resData = { valid: true, errors: [], serverError: '' }
  
  resData = validateAll(body);
  if(!resData.valid){
    res.send(resData);
    return;
  }

  // Check if the user already signed up
  var sql = `SELECT * FROM users WHERE user_mail = '${body.mail.value}';`;
  let result = await sqlHelper.select(sql).catch((err)=>{});
  if(!result){
    resData.valid = false;
    resData.serverError = "serverError";
    res.send(resData);
    return;
  };

  if(result.length > 0){
    resData.valid = false;
    resData.serverError = 'userAlreadyExist';
    res.send(resData);
    return;
  }
    
    // insert the account to the db
    
    sql = `INSERT INTO accounts (business_name, first_user_mail) VALUES ('${body.business.value}', '${body.mail.value}');`;
    result = await sqlHelper.insert(sql).catch((err)=>{});
    if(!result){
      resData.valid = false;
      resData.serverError = 'serverError';
      res.send(resData);
      return;
    }

    let account_id_value = result.insertId;
    // insert the user to the db
    sql = `INSERT INTO users (account_id, user_name, user_password, user_mail, user_phone) VALUES ('${account_id_value}', '${body.name.value}', '${encodePassword(body.password.value)}', '${body.mail.value}', '${body.phone.value}');`;
    result = await sqlHelper.insert(sql).catch((err)=>{});
    if(!result){
      resData.valid = false;
      resData.serverError = 'serverError';
      res.send(resData);
      return;
    }
    const user = {userName: body.name.value,  userId: result.insertId, accountId: account_id_value};
    resData.accessToken = sessionHelper.createSession(user);
    resData.user_name = result.user_name;
    res.send(resData);
});

/**
 * Checks if the user is in the db and adds the new jwt token to the response.
 */
app.post('/login', async function (req, res) {
  const body = req.body;
  let resData = { valid: true, errors: [], serverError: ''}

  resData = validateAll(body);
  if(!resData.valid){
    res.send(resData);
    return;
  }
  
  var sql = `SELECT * FROM users WHERE user_mail = '${body.mail.value}' AND user_password = '${encodePassword(body.password.value)}' ;`;
  let result = await sqlHelper.select(sql).catch((err)=>{});
  if(!result){
    resData.valid = false;
    resData.serverError = "serverError";
    res.send(resData);
    return;
  };

  if(result.length > 0){
    let userResult = result[0];      
    const user = {userName: userResult.user_name,  userId: userResult.user_id, accountId: userResult.account_id};
    resData.user_name = userResult.user_name;
    resData.accessToken = sessionHelper.createSession(user);

  } else {
    resData.valid = false;
    resData.serverError = 'IncorrectMailOrPassword';
  }
  res.send(resData);
});

/**
 * Checks the user is logged in and deletes his session.
 */
app.post('/logout', function (req, res) {
  let resData = { valid: false }

  var userData = sessionHelper.verifySession(req.headers.authorization);
  if(userData){
    sessionHelper.deleteSession(userData);
    resData.valid = true;
  }
  res.send(resData);
});

/**
 * @param {string} password 
 * @returns the encoded password
 */
function encodePassword(password){
  return md5(password);
}

/**
 * @param {request object} req 
 * @param {response object} res 
 * @param {function} next 
 * @returns false if the token not verified
 */
function authMiddleware(req, res, next){
  const userData = sessionHelper.verifySession(req.headers.authorization);
  if(userData){
    req.user = userData;
    next()
  } else {
      // TODO return something else
      return res.send(false);
  }
}

/**
 * Sets the response to true.
 */
app.get('/ping', authMiddleware,  function(req, res){
  res.send(true);
});

/**
 * Sends an email to the given mail address with a link to reset the user's password.
 */
app.post('/forgotPassword', async function (req, res) {
  
  let resData = {valid: true, errors: [], serverError: ''};

  // fields validations
  resData =  validateAll(req.body);
  if(!resData.valid){
    res.send(resData);
  }
  console.log('here1');
  const userMail = req.body.mail.value;
  if(userMail){
      // Check if the mail is in the db
      var sql = `SELECT * FROM users WHERE user_mail = '${userMail}'`;
      let result = await sqlHelper.select(sql).catch((err)=>{});

      // The query failed
      if(!result){
        resData.valid = false;
        resData.serverError = "serverError";
        console.log('here2');
        res.send(resData);
        return;
      };

      if(result.length == 0){
        resData.valid = true;
        res.send(resData);
        return;
      }
      console.log('here3');
      // User exist
      resData.valid = true;
      // Encoding the mail address
      let tokenBody = {userMail: userMail};
      const mailToken = sessionHelper.createToken(tokenBody, (86400 / 24) * 4);
      try {
        resData = await mailgunHelper.sendMail('coheen1@gmail.com', userMail, 'RGB - Reset password', `<a href=${`${process.env.URL}/resetPassword/${mailToken}`}>Click to reset your password.</a>`);
      } catch {
        resData.valid = false;
        resData.serverError = "serverError";
      }
      console.log('here4');
      res.json(resData);

  //  Mail is undefined
  } else {
      resData.valid = false;
      resData.serverError = "serverError";
      res.send(resData);
    }
  });

/**
 * Sets a new password to a given user.
 */
app.post('/resetPassword', async function(req, res){
  const {fields, mailToken} = req.body;
  let resData = {valid: true, errors: [], serverError: ''};

  // Validate the password
  resData = validateAll(fields);
  if(!resData.valid){
    res.send(resData);
  }
  console.log("the token is:", mailToken);
  const data =  sessionHelper.verifyToken(mailToken);
  console.log("the data is invalid", data);
  // Jwt token invalid
  if(!data){
    resData.valid = false;
    resData.serverError = "serverError";
    // res.status(401).send(resData);
    res.send(resData);
    return;
  }

  const password = fields.newPassword.value;
  // Update the password in the db
  let sql = `UPDATE users SET user_password = '${encodePassword(password)}' WHERE user_mail = '${data.userMail}';`;
  let result = await sqlHelper.update(sql).catch((err)=>{});
  // The query failed
  if(!result){
    resData.valid = false;
    resData.serverError = 'serverError';
    // res.status(401).send(resData);
    res.send(resData);
    return;
  }
  // The password has changed
  resData.valid = true;
  res.send(resData);
});

/**
 * @param {object} fields 
 * @returns object with all the invalid fields.
 */
function validateAll(fields){
  let resData = {valid: true, errors: []};
  for(let field in fields){
    let content = fields[`${field}`];
    if(!validate(content.type, true, content.value)){
      resData.valid = false;
      resData.errors.push(field);
    }
  }
  return resData;
}

app.post('/addUser', async function(req, res){
  let resData = {valid: true, errors: [], serverError: ''};
  const fields = req.body.fields;
  const token = req.body.token;

  // fields validations
  resData =  validateAll(fields);
  if(!resData.valid){
    res.send(resData);
    return;
  }

  const userMail = fields.mail.value;
  const tokenBody = sessionHelper.verifySession(token);
  if(userMail && tokenBody){

      // Check if the user is already in the db
      var sql = `SELECT * FROM users WHERE user_mail = '${userMail}'`;
      let result = await sqlHelper.select(sql).catch((err)=>{});

      // The query failed
      if(!result){
        resData.valid = false;
        resData.serverError = "serverError";
        res.send(resData);
        return;
      };

      // User mail is already in the db
      if(result.length > 0){
        resData.valid = false;
        resData.serverError = "userMailAlreadyExist";
        res.send(resData);
        return;
      }

      // New user - insert the new user to the db
      sql = `INSERT INTO users (account_id, user_mail) VALUES ('${tokenBody.accountId}', '${userMail}');`;
      result = await sqlHelper.insert(sql).catch((err)=>{});
      if(!result){
        resData.valid = false;
        resData.serverError = 'serverError';
        res.send(resData);
        return;
      }
      
      // Encoding the mail address and the account id 
      const mailToken = sessionHelper.createToken({userMail: userMail, accountId: tokenBody.accountId, userId: result.insertId}, 86400 * 10);
      // send the invite mail to the user
      // TODO replace my mail with userMail
      try {
        resData = await mailgunHelper.sendMail('coheen1@gmail.com', 'coheen1@gmail.com', 'RGB - Invitation', `You have received an invitation to join RGB! <br/> <a href=${`${process.env.URL}/newUser/${mailToken}`}>Click to sign up.</a>`);
        resData.user = {user_mail: userMail, user_id: result.insertId};
      } catch {
        resData.valid = false;
        resData.serverError = "serverError";
      }
      res.json(resData);

  //  Mail is undefined
  } else {
      resData.valid = false;
      resData.serverError = "serverError";
      res.send(resData);
    }
});


app.post('/editUser', async function(req, res){
  let resData = {valid: true, errors: [], serverError: ''};
  const {fields, token} = req.body;

  // fields validations
  resData =  validateAll(fields);
  if(!resData.valid){
    res.send(resData);
    return;
  }

  const tokenBody = sessionHelper.verifyToken(token);
  if(tokenBody) {
    const {accountId, userId} = tokenBody;
    
    // insert the account to the db
    let sql = `UPDATE users SET user_name = '${fields.name.value}', user_password = '${encodePassword(fields.password.value)}', user_phone = '${fields.phone.value}' WHERE user_id = ${userId};`;
    let result = await sqlHelper.update(sql).catch((err)=>{});
    if(!result){
      resData.valid = false;
      resData.serverError = 'serverError';
      res.send(resData);
      return;
    }

    sql = `SELECT * FROM accounts WHERE account_id = '${accountId}'`;
    result = await sqlHelper.select(sql).catch((err)=>{});
    if(!result || result == 0){
      resData.valid = false;
      resData.serverError = 'serverError';
      res.send(resData);
      return;
    }

    const adminMail = result[0].first_user_mail;

    try {
      resData = await mailgunHelper.sendMail('coheen1@gmail.com', adminMail, 'RGB - Invitation accepted', `The invitation you sent to <b>${fields.name.value}</b> was accepted.`);
    } catch {}

    // userMail
    const user = {userName: fields.name.value,  userId: userId, accountId: accountId };
    resData.accessToken = sessionHelper.createSession(user);
    resData.user_name = result.user_name;

  } else {
    resData.valid = false;
    resData.serverError = "serverError";
  }
  res.send(resData);
});

app.get('/getUsers', authMiddleware, async function(req, res){
  const user = req.user;
  const resData = {valid: true};
  // TODO check if the user is an admin
  let sql = `SELECT * FROM users WHERE account_id = '${user.accountId}'`;
  let result = await sqlHelper.select(sql).catch((err)=>{});

  // The query failed
  if(!result){
    resData.valid = false;
    resData.serverError = "serverError";
    res.send(resData);
    return;
  };

  resData.usersList = result;
  res.send(resData);

});



/**
 * 
 {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Inl1dmFsIGNvaGVuIiwidXNlcklkIjo2NywiYWNjb3VudElkIjoxMTIsInNlc3Npb25faWQiOjAsImlhdCI6MTYyNDk3NzM4OCwiZXhwIjoxNjI1ODQxMzg4fQ.M4CLz107Pfery9dnBeLp_W23OBIQdK2OEEjVA93aVOo",
    "fields": {
        "mail": {
            "type": "mail",
            "value" : "yuval.halamish@workiz.com"
        }
    }
}
 */
