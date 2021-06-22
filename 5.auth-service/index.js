const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
var cors = require('cors')
app.use(cors())
var db = require('./db');
const con = require('./db');
app.use(express.json());
app.get('/', function (req, res) {
  res.send('hello there');
});

app.post('/signup', async (req, res) => {
  let { email, password } = req.body
  const hash = await bcrypt.hash(password, 10)
  if (hash) {
    const record = [[email, hash]]
    var sql = 'INSERT INTO users (user_email,user_password) VALUES ?';
    db.query(sql, [record], (err, data) => {
      if (err) {
        return res.status(500).send("Sql Error")
      }
      res.send({ email, hash })
    })
  }
  else {
    return res.status(500).send("hash error");
  }
})



app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT ?? 8000}/`);
});