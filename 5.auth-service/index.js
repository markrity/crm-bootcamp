import SqlHelper from './helpers/sqlHelper.js';
import express from 'express';
import cors from 'cors';
import SessionHelper from './helpers/sessionHelper.js';
import md5 from 'md5';
import validate from './helpers/validationHelper.js';
import dotenv from 'dotenv';
import MailGun from 'mailgun-js';

const app = express();
const sessionHelper = new SessionHelper();
const sqlHelper = new SqlHelper();
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
    var sql = `INSERT INTO users (account_id, user_name, user_password, user_mail, user_phone) VALUES ('${account_id_value}', '${body.name.value}', '${encodePassword(body.password.value)}', '${body.mail.value}', ${body.phone.value});`;

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
    console.log('here in incorrect mail');
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
  console.log(userData)
  if(userData){
    next()
  } else {
      console.log("returns false");
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

  const userMail = req.body.mail.value;
  if(userMail){
      // Check if the mail is in the db
      var sql = `SELECT * FROM users WHERE user_mail = '${userMail}'`;
      let result = await sqlHelper.select(sql).catch((err)=>{});

      // The query failed
      if(!result){
        resData.valid = false;
        resData.serverError = "serverError";
        res.send(resData);
        return;
      };

      if(result.length == 0){
        resData.valid = true;
        res.send(resData);
        return;
      }

      // User exist
      resData.valid = true;
      // Encoding the mail address
      let tokenBody = {userMail: userMail};
      const mailToken = sessionHelper.createToken(tokenBody);
      console.log("this is the mail link to reset the password: ", `http://localhost:3000/resetPassword/${mailToken}`);
      try {
        resData = await sendMail('coheen1@gmail.com', userMail, 'RGB - Reset password', `<a href=${`http://localhost:3000/resetPassword/${mailToken}`}>Click to reset your password.</a>`);
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
  
  const data =  sessionHelper.verifyToken(mailToken);
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
  console.log(`password changed to ${encodePassword(password)}`);
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

// app.post('/addUser', async function(req, res){
//   let resData = {valid: true, errors: [], serverError: ''};
//   const fields = req.body.fields;
//   const token = req.body.token;

//   // fields validations
//   resData =  validateAll(fields);
//   if(!resData.valid){
//     res.send(resData);
//     return;
//   }

//   const userMail = fields.mail.value;
//   if(userMail){

//     // Verify the token and extract the account id from it
//       const tokenBody = sessionHelper.verifySession(token);
//       if(!tokenBody){
//         resData.valid = false;
//         resData.serverError = 'serverError';
//         res.send(resData);
//         return;
//       }

//       // Encoding the mail address and the account id 
//       const mailToken = sessionHelper.createToken({userMail: userMail, accountId: tokenBody.accountId});

//       // Insert the new user to the db

      
//       // send the invite mail to the user
//       try {
//         resData = await sendMail('coheen1@gmail.com', userMail, 'RGB - Invitation', `You have received an invitation to join RGB! <br/> <a href=${`http://localhost:3000/bla/${mailToken}`}>Click to sign up.</a>`);
//       } catch {
//         resData.valid = false;
//         resData.serverError = "serverError";
//       }
//       res.json(resData);

//   //  Mail is undefined
//   } else {
//       resData.valid = false;
//       resData.serverError = "serverError";
//       res.send(resData);
//     }
// });


async function sendMail(from, to, subject, html){
  const mailGun = new MailGun({
    apiKey: process.env.API_KEY,
    domain: process.env.DOMAIN,
  });
  var data = {
    from: from,
    to: to,
    subject: subject,
    html: html,
  };
  // Sending the data to the specify mail
  
  return new Promise((resolve, reject)=>{
    mailGun.messages().send(data, function (err, body) {
      if (err) {
        reject('failed to send email');
      } 
      resolve({valid: true})
    });
  });
}