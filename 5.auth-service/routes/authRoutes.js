const express = require('express');
const generateToken = require('../generateToken')
const bcrypt = require('bcrypt')
require('dotenv').config();
var db = require('../db');
var Mailgun = require('mailgun-js');
const router = express.Router();
const app = express()


var api_key = '1f1bd6a9-365c56ab';

//Your domain, from the Mailgun Control Panel
var domain = 'TheWeddingPlanners.com';

//Your sending email address
var from_who = 'WeddingsCRM@gmail.com';

//Tell express to fetch files from the /js directory
app.use(express.static(__dirname + '/js'));
//We're using the Jade templating language because it's fast and neat
app.set('view engine', 'jade')


app.get('/resetPassword', function (req, res) {
    console.log("In ResetPassword")
    var mailgun = new Mailgun({ apiKey: api_key, domain: domain });
    var data = {
        from: from_who,
        //The email to contact
        to: req.params.mail,
        //Subject and text data  
        subject: 'Hello from Mailgun',
        html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://localhost:3000/resetPassword/valid?' + req.params.mail + '">Click here to add your email address to a mailing list</a>'
    }

    mailgun.messages().send(data, function (err, body) {
        //If there is an error, render the error page
        if (err) {
            res.render('error', { error: err });
            console.log("got an error: ", err);
        }
        else {
            console.log(body);
        }
    });
});



router.post("/login", async (req, res) => {
    const { password, email } = req.body
    console.log(email)
    const hash = await bcrypt.hash(password, 10)
    if (hash) {
        console.log(email)
        let sql = `SELECT * FROM Users WHERE email='${email}'`;
        db.query(sql, async (err, data) => {
            if (err)
                return res.sendStatus(500)
            const userInfo = data[0]
            console.log(userInfo)
            generateToken(res, userInfo.id, userInfo)
        })
    }
    else {
        return res.sendStatus(500)
    }
});

router.post('/signup', async (req, res) => {
    let { firstName, lastName, phoneNumber, email, buisnessId, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    if (hash) {
        const userRecord = [[firstName, lastName, phoneNumber, email, buisnessId, hash]]
        sql = 'INSERT INTO Users (FirstName,LastName, PhoneNumber,Email,BuisnessID,Password) VALUES ?'
        db.query(sql, [adminRecord], async (err, result, fields) => {
            if (err) {
                return res.status(500).send("Sql Error")
            }
            await generateToken(res, result.insertId, adminRecord)
        })
    }

})

router.post('/addBuisness', async (req, res) => {
    const { buisnessName, email } = req.body.buisnessInfo
    const { firstName, lastName, phoneNumber, password } = req.body.adminInfo
    const hash = await bcrypt.hash(password, 10)
    if (hash) {
        const buisnessRecord = [[buisnessName, email]]
        let sql = 'INSERT INTO Buisnesses (Name,Email) VALUES ?';
        db.query(sql, [buisnessRecord], (err, result, fields) => {
            if (err) {
                return res.status(500).send("Sql Error")
            }
            const adminRecord = [[firstName, lastName, phoneNumber, email, result.insertId, hash]]
            sql = 'INSERT INTO Users (FirstName,LastName, PhoneNumber,Email,BuisnessID,Password) VALUES ?'
            db.query(sql, [adminRecord], async (err, result, fields) => {
                if (err) {
                    return res.status(500).send("Sql Error")
                }
                await generateToken(res, result.insertId, adminRecord)
            })
        })
    }
    else
        return res.status(500).send("Unable to Hash")
})


router.get("/logout", (req, res) => {
    return res
        .clearCookie("token")
        .status(200)
        .json({ message: "Successfully logged out 😏 🍀" });
});


module.exports = router