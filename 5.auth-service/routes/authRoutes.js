const express = require('express');
const generateToken = require('../generateToken')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config();
const db = require('../db');
const Mailgun = require('mailgun-js');
const router = express.Router();


router.post('/resetPassword', function (req, res) {

    let sql = `SELECT * FROM users WHERE email='${req.body.email}'`;
    db.query(sql, async (err, data) => {
        if (err)
            return res.sendStatus(500)
        const userInfo = data[0]
        const token = generateToken(res, userInfo.id, userInfo, false)
        const mailgun = new Mailgun({ apiKey: process.env.apiKey, domain: process.env.domain });
        const msgData = {
            from: process.env.email,
            to: req.body.email,
            subject: 'Reset Your Password',
            html: '<h1>Click on the link below to reset password</h1> <a href="http://localhost:3000/auth/resetPassword/valid?token=' + token + '">Im Clickable!</a>'
        }

        mailgun.messages().send(msgData, function (err, body) {
            if (err) {
                return res.sendStatus(400)
            }
            return res.sendStatus(200)
        });
    });
})


router.post('/checkBuisnessName', async (req, res) => {
    const { buisnessName } = req.body
    let sql = `SELECT * FROM Buisnesses WHERE Name ='${buisnessName}'`
    db.query(sql, async (err, data) => {
        if (err)
            return res.sendStatus(500)
        console.log(data)
        return res.sendStatus(data.length === 0 ? 200 : 401)
    })
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

            const mailgun = new Mailgun({ apiKey: process.env.apiKey, domain: process.env.domain });
            const data = {
                from: process.env.email,
                to: email,
                subject: 'Verification Email',
                html: '<h1>Click on the link below to finish Regisration</h1> <a href="http://localhost:3000/verification/valid?token=' + token + '">Im Clickable!</a>'
            }
            mailgun.messages().send(data, function (err, body) {
                if (err) {
                    console.log("got an error: ", err);
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
            if (err)
                return res.sendStatus(500)
            return res.status(200)
        })
    }

})

router.post("/login", async (req, res) => {
    const { password, email } = req.body
    const hash = await bcrypt.hash(password, 10)
    if (hash) {
        let sql = `SELECT * FROM users WHERE email='${email}'`;
        db.query(sql, async (err, data) => {
            if (err)
                return res.sendStatus(500)
            const userInfo = data[0]
            if (userInfo && userInfo.Password) {
                const isMatch = await bcrypt.compare(password, userInfo.Password)
                if (isMatch)
                    generateToken(res, userInfo.id, userInfo, true)
                else
                    return res.sendStatus(401)
            }
            else
                return res.sendStatus(401)
        })
    }
    else {
        return res.sendStatus(500)
    }
});

router.post('/addBuisness', async (req, res) => {
    const { buisnessName, email } = req.body.buisnessInfo
    const { firstName, lastName, phoneNumber, password } = req.body.adminInfo
    const hash = await bcrypt.hash(password, 10)
    if (hash) {
        const buisnessRecord = [[buisnessName, email]]
        let sql = 'INSERT INTO Buisnesses (Name,Email) VALUES ?';
        db.query(sql, [buisnessRecord], (err, result, fields) => {
            if (err)
                return res.sendStatus(401)
            console.log(result)
            const buisnessID = result.insertId
            const adminRecord = [[firstName, lastName, phoneNumber, email, buisnessID, hash, true]]
            sql = 'INSERT INTO users (FirstName,LastName, PhoneNumber,Email,BuisnessID,Password,isAdmin) VALUES ?'
            db.query(sql, [adminRecord], async (err, result, fields) => {
                if (err) {
                    return res.status(500).send("Sql Error")
                }
                const token = generateToken(res, result.insertId, { firstName }, false)
                res.cookie('token', token).status(200).json({ buisness: { buisnessName, buisnessID }, user: { firstName, lastName, isAdmin: 1 } })
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