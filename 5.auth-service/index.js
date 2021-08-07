const express = require('express');
const jwt = require('jsonwebtoken')
const authRoutes = require('./routes/authRoutes')
const buisnessRoutes = require('./routes/buisnessRoutes')
const chatRoutes = require('./routes/chatRoutes')
const broadcastRoutes = require('./routes/broadcastRoutes')


const cookieParser = require('cookie-parser');
const cors = require('cors');
const requireAuth = require('./Middleware/requireAuth');
const db = require('./db')
require('dotenv').config();

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000', exposedHeaders: ["set-cookie"] }));

app.options('*', cors());
app.use(express.json());
app.use(cookieParser())
app.use(requireAuth)
app.use('/auth', authRoutes)
app.use('/buisness', buisnessRoutes)
app.use('/chat', chatRoutes)
app.use('/broadcast', broadcastRoutes)

app.get('/me', (req, res) => {
  const { id } = req.user
  try {
    let sql = `SELECT users.id,users.password ,users.firstName, users.lastName, users.email, users.phoneNumber, users.isAdmin, Buisnesses.id as buisnessID,
    Buisnesses.name as buisnessName 
    FROM users INNER JOIN Buisnesses ON users.buisnessID = Buisnesses.id WHERE users.id='${id}'`;
    db.query(sql, (err, result) => {
      if (err)
        return res.sendStatus(500)
      const user = result[0]
      console.log(user)
      const { buisnessID, firstName, lastName, id, email, phoneNumber, isAdmin, buisnessName } = user
      const userInfo = { firstName, lastName, id, email, phoneNumber, isAdmin }
      return res.status(200).send({ userInfo, buisness: { buisnessID, buisnessName } })
    })
  } catch {
    return res.sendStatus(403);
  }
})

app.get('/', (req, res) => {
  res.send('hello there');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT ?? 8000}/`);
});