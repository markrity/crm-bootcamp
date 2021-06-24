const e = require('cors');
const cors = require('cors');
const express = require('express');
const mysql = require('mysql');
const md5=require('md5');
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');
var router = express.Router();


const toksec="afj3487avn754ljh9udsg";

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gameStation"
});

// router.use(middle)

app.get('/', function(req, res) {
  res.send('hello ');
});

app.post('/register',(req,res)=>{

    const {fullName,companyName,phoneNumber,email,password}=req.body;
    const encPassword=(md5(password));
    console.log(encPassword);
    let emailExists=false;
    con.query(`SELECT * FROM accounts WHERE email='${email}'`, function (err, result, fields) {
    if (err) throw err;
    if(result!=0){
      emailExists=true;
    }
    else{
      
      var sql = `INSERT INTO accounts (fullName, companyName,phoneNumber,email,userPassword) VALUES ('${fullName}', '${companyName}','${phoneNumber}','${email}','${encPassword}')`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
  
      });
    
    
    }
    const data={emailExists}; 
     res.send(data);
  }
)});

app.post('/login',(req,res)=>{
  
  const {email,password}=req.body;
  const encPassword=(md5(password));
  
  let token=null;
  let loginCorrect=false;
  con.query(`SELECT * FROM accounts WHERE email='${email}' AND userPassword='${encPassword}'`, function (err, result, fields) {
  if (err) throw err;
  if(result!=0){
    loginCorrect=true;
    console.log("login correct");
    const accessToken = jwt.sign({ email: email}, toksec);
    jwt.ver
    token=accessToken;
    console.log(token);
  }
  else{
    console.log("login faild");
  }

  const data={loginCorrect,token}; 
   res.send(data);
}
)});

app.listen("8005", () => {
  console.log(`Server running at http://localhost:8005/`);

});