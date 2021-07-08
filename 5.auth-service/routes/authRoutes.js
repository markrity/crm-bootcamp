const express = require('express');
const generateToken = require('../generateToken')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config();
var db = require('../db');
var Mailgun = require('mailgun-js');
const router = express.Router();


router.post('/resetPassword', function (req, res) {
    console.log("In ResetPassword")

    let sql = `SELECT * FROM users WHERE email='${req.body.email}'`;
    db.query(sql, async (err, data) => {
        if (err)
            return res.sendStatus(500)
        const userInfo = data[0]
        const token = generateToken(res, userInfo.id, userInfo, false)
        console.log(token)
        var mailgun = new Mailgun({ apiKey: process.env.apiKey, domain: process.env.domain });
        var data = {
            from: process.env.email,
            //The email to contact
            to: req.body.email,
            //Subject and text data  
            subject: 'Reset Your Password',
            html: '<h1>Click on the link below to reset password</h1> <a href="http://localhost:3000/auth/resetPassword/valid?token=' + token + '">Im Clickable!</a>'
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
})


router.post('/addEmployee', async (req, res) => {
    const { password, firstName, lastName, phoneNumber, email, buisnessID } = req.body
    const hash = await bcrypt.hash(password, 10)
    if (hash) {
        const userRecord = [[firstName, lastName, phoneNumber, email, buisnessID, hash, false, "Pending"]]
        sql = 'INSERT INTO users (FirstName,LastName, PhoneNumber,Email,BuisnessID,Password,isAdmin,status) VALUES ?'
        db.query(sql, [userRecord], async (err, result, fields) => {
            if (err) {
                return res.status(500).send("Sql Error")
            }
            const token = await generateToken(res, result.insertId, userRecord, false)

            var mailgun = new Mailgun({ apiKey: process.env.apiKey, domain: process.env.domain });
            var data = {
                from: process.env.email,
                //The email to contact
                to: email,
                //Subject and text data  
                subject: 'Verification Email',
                html: '<h1>Click on the link below to finish Regisration</h1> <a href="http://localhost:3000/verification/valid?token=' + token + '">Im Clickable!</a>'
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
        })
    }
})


router.post('/verification', async (req, res) => {
    const { token } = req.body
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    let sql = `UPDATE users SET status ='Completed' WHERE id = ${id}`
    db.query(sql, async (err, data) => {
        if (err)
            return res.sendStatus(500)
        sql = `SELECT * FROM users WHERE id='${id}'`;
        db.query(sql, async (err, data) => {
            if (err)
                return res.sendStatus(500)
            const userInfo = data[0]
            console.log(userInfo)
            return res.cookie('token', token).status(200).json({ userInfo })
        })
    })
})

router.post('/changePassword', async (req, res) => {
    const { token, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    if (hash) {
        sql = `UPDATE users SET Password ='${hash}' WHERE id = ${id}`
        db.query(sql, async (err, data) => {
            console.log(data)
            if (err)
                return res.sendStatus(500)
            return res.status(200)
        })
    }

})

router.post("/login", async (req, res) => {
    const { password, email } = req.body
    console.log(email)
    const hash = await bcrypt.hash(password, 10)
    if (hash) {
        console.log(email)
        let sql = `SELECT * FROM users WHERE email='${email}'`;
        db.query(sql, async (err, data) => {
            if (err)
                return res.sendStatus(500)
            const userInfo = data[0]
            console.log(userInfo)
            generateToken(res, userInfo.id, userInfo, true)
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
        sql = 'INSERT INTO users (FirstName,LastName, PhoneNumber,Email,BuisnessID,Password) VALUES ?'
        db.query(sql, [adminRecord], async (err, result, fields) => {
            if (err) {
                return res.status(500).send("Sql Error")
            }
            await generateToken(res, result.insertId, adminRecord, true)
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
            const adminRecord = [[firstName, lastName, phoneNumber, email, result.insertId, hash, true]]
            sql = 'INSERT INTO users (FirstName,LastName, PhoneNumber,Email,BuisnessID,Password,isAdmin) VALUES ?'
            db.query(sql, [adminRecord], async (err, result, fields) => {
                if (err) {
                    return res.status(500).send("Sql Error")
                }
                await generateToken(res, result.insertId, adminRecord, true)
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




// CREATE TABLE `Users` (
//     `id` bigint NOT NULL AUTO_INCREMENT,
//     `FirstName` VARCHAR(45) NULL,
//     `LastName` VARCHAR(45) NULL,
//     `PhoneNumber` VARCHAR(10) NULL,
//     `email` VARCHAR(45) NULL,
//     `BuisnessID` BIGINT(20) NULL,
//     `Password` VARCHAR(100) NULL,
//     PRIMARY KEY (`id`),
//       FOREIGN KEY (`BuisnessID`)
//       REFERENCES `Buisnesses` (`id`)
//       ON DELETE NO ACTION
//       ON UPDATE NO ACTION);