var mysql = require('mysql');
  
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Project"
});


const express = require('express');
const app = express();

var cors = require('cors')
app.use(cors());

//const bodyParser = require('body-parser')
app.use(express.json());
app.use(express.urlencoded());

app.get('/admin', function(req, res) {
    con.query("SELECT * FROM leads", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });

app.post('/', function(req, res) {
  var {firstname,lastname,phone} = req.body;
  var first="";
  var last="";
  var phone2="";

  first = validateName(firstname)
  last = validateName(lastname)
  phone2 = validatePhone(phone)
    
  if (first== "" && last == "" && phone2 == "") {
      var sql = `INSERT INTO leads (first_name, last_name, phone) VALUES ('${firstname}', '${lastname}','${phone}')`;
      con.query(sql, function (err, result) {
        if (err) throw err;
      });
    res.json({status:true})
  }
  else {
    res.json({status:false, first:first, last:last, phone:phone2})
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});

function validatePhone(phone) {  
  var phoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  var phoneResult = phoneRGEX.test(phone);
  if (!phoneResult) {
    return "invalid phone";
  }
  return "";
}

function validateName(name) {  
  var NameRGEX = /^[a-zA-Z ]+$/ ;
  var nameResult = NameRGEX.test(name);
  if (!nameResult) {
    return "invalid name";
  }
  return "";
}

app.post('/delete', function(req, res) {
  var id = req.body.lead_id;
    con.query(`DELETE FROM leads WHERE lead_id='${id}'`, function (err, result, fields) {
      if (err) throw err;
      res.json({status:true})
    });
  });

