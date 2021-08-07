const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Company = require('./models/Company');
const Message = require('./models/Message');
const Room = require('./models/Room');
const User = require('./models/User');
var cors = require('cors')
var db = require('./db');
app.use(cors({ credentials: true, origin: 'http://localhost:3000', exposedHeaders: ["set-cookie"] }));

mongoose.set('useFindAndModify', false);

const io = require('socket.io')(2000, {
  cors: {
    origin: ['http://localhost:8082', 'http://localhost:3000']
  }
})

const mustacheExpress = require('mustache-express');


function GetFormattedDate() {
  var todayTime = new Date();
  var month = todayTime.getMonth() + 1;
  var day = todayTime.getDate();
  var year = todayTime.getFullYear();
  var hour = todayTime.getHours();
  var minutes = todayTime.getMinutes();
  return day + "/" + month + "/" + year + " " + hour + ":" + minutes;
}


app.engine('html', mustacheExpress());
app.use(express.static('views'));
app.set('view engine', ['html']);
app.set('views', __dirname + '/views');

app.use(express.json());

const mongouri = mongoose.connect('mongodb+srv://NivosCo:Nfn151294@cluster0.agewf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

mongoose.connection.on('connected', () => console.log('connected in to mongo instance'));
mongoose.connection.on('error', (err) => console.error('error connecting Help', err));

io.on('connect', (socket) => {
  socket.on('send-msg', async (message, room, sender, receiver) => {
    const filter = { _id: room }
    const msg = new Message({ message, from: sender, to: receiver, date: GetFormattedDate() })
    await msg.save()
    const doc = await Room.findOneAndUpdate(filter, { $push: { conversation: [msg] } }, { new: true })
      .populate({
        path: 'conversation', model: 'Message', select: 'from to date message',
        populate: { path: 'from', model: 'User' }
      });
    socket.to(String(room)).emit('receive-msg', doc._id, msg)
    console.log("this is room:", room)
  })

  socket.on('typing', (room, isTyping, role, name) => {
    if (role === "client")
      socket.to(String(room)).emit('client-typing', room, isTyping)
    else
      socket.to(String(room)).emit('crm-typing', isTyping, name)
  })


  socket.on('join-room', (room, cb) => {
    socket.join(String(room))
    console.log("joining Single room:", room)
    cb("Wellcome")
  })

  socket.on("disconnect", async () => {
    try {
      const room = socket.handshake.query['room']
      const host = socket.handshake.query['host']
      const roomFound = await Room.findById(room)
      roomFound.isOnline = false
      console.log(roomFound)
      await roomFound.save()
      const company = await Company.findById(host).
        populate({
          path: 'rooms', model: 'Room',
          select: '_id user conversation isOnline', populate: [{
            path: 'conversation',
            model: 'Message'
          }, {
            path: 'user',
            model: 'User'
          }]
        }
        )
      console.log("Room: " + room + " was Disconnected")
      io.to(String(host)).emit('refreshRooms', company.rooms)
    }
    catch {
      console.log("Admin Disconnected")
    }
  })

  socket.on('notify-host', async (host, room) => {
    const roomObj = await Room.findById(String(room))
      .populate({ path: 'conversation', model: 'Message' })
      .populate({ path: 'user', model: 'User' })
    const company = await Company.findById(host).populate({ path: 'rooms', model: 'Room' })
    let isExists = false

    company.rooms.forEach(singleRoom => {
      if (singleRoom._id == room) {
        isExists = true
      }
    })

    if (!isExists) {
      try {
        company.rooms = [...company.rooms, roomObj]
        await company.save()
      } catch {
        console.log("Couldn't Save Room")
      }
    }
    console.log("NOTIFYYY ", roomObj)
    io.to(String(host)).emit('notify-host', roomObj, !isExists)
  })

  socket.on('get-all-rooms', async (companyID, cb) => {
    try {
      const company = await Company.findById(companyID).
        populate({
          path: 'rooms', model: 'Room',
          select: '_id user conversation isOnline', populate: [{
            path: 'conversation',
            model: 'Message'
          }, {
            path: 'user',
            model: 'User'
          }]
        }
        )
      if (!company)
        console.log(company)
      company.rooms.forEach((room, index) => {
        socket.join(String(room._id))
      })
      cb(company.rooms)
    } catch {
      console.log("Error")
    }
  })
})

app.get('/index', function (req, res) {
  const data = {
    logo: 'The Wedding Planners',
    nav: createNav(),
    form: createFormContant()
  };
  res.render('index', data);
});

app.post('/send-msg', (req, res) => {
  try {
    const { msg } = req.body
    console.log(msg)
    return res.status(200).json(msg)
  } catch {
    return res.status(500)
  }
})

app.post('/rooms', (req, res) => {
  const { buisnessID } = req.body
  let sql = `SELECT landingid as landingID FROM crm.landingId
  WHERE buisnessID = '${buisnessID}'`;

  db.query(sql, async (err, data) => {
    if (err) {
      return res.sendStatus(400)
    }
    if (data.length !== 0) {
      console.log(data)
      const { landingID } = data[0]
      console.log(landingID)
      const company = await Company.findById(landingID)
      return res.status(200).json({ landingID, myID: company.user })
    }
    console.log("Couldn't find landingID")
    return res.sendStatus(300)
  })
})

app.post('/createChat', async (req, res) => {
  const { buisnessID, name, email, buisnessName } = req.body
  console.log("body:  ", req.body)
  try {
    const user = new User({ firstName: name, email })
    console.log(user)
    await user.save()
    const company = new Company({ user, name: buisnessName })
    await company.save()
    let sql = `INSERT INTO landingId (buisnessID, landingid) VALUES (${buisnessID}, '${company._id}');`;

    db.query(sql, async (err, data) => {
      if (err) {
        console.log(err)
        return res.sendStatus(400)
      }
      return res.status(200).json({ landingID: company._id, myID: company.user })
    })
  }
  catch (err) {
    console.log(err)
  }

})

app.post('/restore', async (req, res) => {
  const { room } = req.body
  console.log("RRROOOMMM", room)
  try {
    let roomObj = await Room.findById(String(room)).populate({
      path: 'conversation', model: 'Message', select: 'from to date message'
    }).populate({ path: 'user', model: 'User' });
    roomObj.isOnline = true
    await roomObj.save()
    res.status(200).json({
      message: { message: `Wellcome Back  ${roomObj.user.firstName} !` },
      roomObj
    })
  } catch {
    console.log("errorrr")
    res.sendStatus(300)
  }
})

app.post('/verify', async (req, res) => {

  const { email, name, companyName } = req.body
  let company = await Company.findOne({ name: companyName })
  let user = await User.findOne({ email })
  let room
  if (!user) {
    user = new User({ firstName: name, email })
    user.save()
    room = new Room({ user: user._id, crm: company.user })
    room.save()
    console.log("Created room: ", room)
  }
  else {
    room = await Room.findOne({ user: user._id })
    room.isOnline = true
    await room.save()
    console.log("existed room: ", room)
  }
  return res.clearCookie("room").cookie('room',
    `${room._id};${company._id};${company.user};${user._id} `, {
    secure: false
  }).status(200).json({
    msg: {
      message: `Wellcome! Its nice to meet you ${name}`
    },
    room: room._id, host: company._id, worker: company.user, client: user._id
  })
})




app.post('/send-lead', function (req, res) {
  const { fullName, email, phoneNumber } = req.body.lead
  const record = [[fullName, email, phoneNumber]]
  var sql = 'INSERT INTO leads (lead_name,lead_email,lead_phone) VALUES ?';
  let status = 200
  db.query(sql, [record], function (err, data) {
    if (err) {
      console.log(err)
      status = 500
    }
    else
      console.log("User data is inserted successfully ");
  });  // redirect to user form page after inserting the data
  res.status(status).send()
})


app.get('/admin', function (req, res) {
  const { sortBy } = req.query
  console.log(sortBy)
  var sql = `SELECT * FROM leads ORDER BY lead_name ${sortBy ?? 'ASC'}`
  let tableHeaders = ['ID', 'Name', 'Email', 'Phone Number', 'Date Submited']
  db.query(sql, function (err, sortedTable) {
    if (err)
      throw err
    const data = {
      tableHeaders,
      sortedTable
    }
    console.log(data)
    res.render('admin', data)
  });
})

app.listen(process.env.PORT || 8082, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 8082}/index`);
});

const createNav = () => {
  const about = { title: 'About', href: '' }
  const otherEvents = { title: 'Our Latest Events', href: '' }
  const reviews = { title: 'Reviews', href: '' }
  return [about, otherEvents, reviews]
}

const createFormContant = () => {
  initHeader = 'Let Us Set Your Perfect Day'
  const nameInput = createInput("text", "fullName", "Enter Name")
  const emailInput = createInput("text", "email", "Enter Email")
  const phoneNumber = createInput("text", "phone", "Enter PhoneNumber")
  btnText = "Contact Me"
  submitedHeader = 'Please Check Your Credentials'
  return { initHeader, formFields: [nameInput, emailInput, phoneNumber], btnText, submitedHeader }
}
const createInput = (type, id, placeholder) => {
  return { type, id, placeholder }
}