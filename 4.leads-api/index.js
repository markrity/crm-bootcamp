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

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/admin', function(req, res) {
  // con.connect(function(err) {
    con.query("SELECT * FROM leads", function (err, result, fields) {
      if (err) throw err;
      //console.log(result);
      res.send(result);
    });
  });
// });

app.post('/', function(req, res) {
  var {firstname,lastname,phone} = req.body;
  console.log(firstname);
  console.log(req.body);
  var invalid_type="";

  invalid_type = validateName(firstname,"first")
  invalid_type+= validateName(lastname,"last")
  invalid_type+= validatePhone(phone)
    
  if (invalid_type==="") {
      console.log("Connected!");
      var sql = `INSERT INTO leads (first_name, last_name, phone) VALUES ('${firstname}', '${lastname}','${phone}')`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    
    res.json({status:true})
  }
  else {
    res.json({status:false, reason:invalid_type})
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});

function validatePhone(phone,invalid_type) {  
  var phoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  var phoneResult = phoneRGEX.test(phone);
  if (!phoneResult) {
    return "invalid phone \r\n";
  }
  return "";
}

function validateName(name,index) {  
  var NameRGEX = /^[a-zA-Z ]+$/ ;
  var nameResult = NameRGEX.test(name);
  if (!nameResult) {
    return "invalid " + index + " name \r\n";
  }
  return "";
}

app.post('/delete', function(req, res) {
  console.log(req.body)
  var id = req.body.lead_id;
  console.log(id)
  // con.connect(function(err) {
    con.query(`DELETE FROM leads WHERE lead_id='${id}'`, function (err, result, fields) {
      if (err) throw err;
      //console.log(result);
      res.json({status:true})
    });
  });