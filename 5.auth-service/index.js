const e = require('cors');
const cors = require('cors');
const express = require('express');
const mysql = require('mysql');
const md5=require('md5');
const app = express();
app.use(express.json());
app.use(cors());


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gameStation"
});

app.get('/', function(req, res) {
  res.send('hello ');
});

app.post('/register',(req,res)=>{

    const {fullName,companyName,phoneNumber,email,password}=req.body;
    const encPassword=(md5(password));
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

app.listen("8005", () => {
  console.log(`Server running at http://localhost:8005/`);

});