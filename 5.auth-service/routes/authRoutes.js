const express = require('express');
const generateToken = require('../scripts/generateToken')
const generateEmail = require('../scripts/generateEmail')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config();
const db = require('../db');
const router = express.Router();
const RESET_PASSWORD_EMAIL = "Reset Password"
const RESET_PASSWORD_SUBJECT = "Reset Your Password"
const VERIFICATION_EMAIL_SUBJECT = "Verification Email"

router.post('/resetPassword', function (req, res) {

    let sql = `SELECT * FROM users WHERE email='${req.body.email}'`;
    db.query(sql, async (err, data) => {
        if (err)
            return res.sendStatus(500)
        const userInfo = data[0]
        const token = generateToken(res, userInfo.id, userInfo, false)
        generateEmail(RESET_PASSWORD_SUBJECT, RESET_PASSWORD_EMAIL, { token })
    });
})


router.post('/checkBuisnessName', async (req, res) => {
    const { buisnessName } = req.body
    let sql = `SELECT * FROM Buisnesses WHERE Name ='${buisnessName}'`
    db.query(sql, async (err, data) => {
        if (err)
            return res.sendStatus(500)
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
            generateEmail(VERIFICATION_EMAIL_SUBJECT, VERIFICATION_EMAIL_SUBJECT, { token })
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
    console.log("In Login")
    if (hash) {
        let sql = `SELECT users.id,users.Password ,users.FirstName, users.LastName, users.email, users.PhoneNumber, users.isAdmin, Buisnesses.id as BuisnessID 
        FROM users INNER JOIN Buisnesses ON users.BuisnessID = Buisnesses.id WHERE users.email='${email}'`;
        db.query(sql, async (err, result) => {
            if (err)
                return res.sendStatus(500)
            user = result[0]
            const { BuisnessID, FirstName, LastName, id, email, PhoneNumber, isAdmin } = user
            const userInfo = { FirstName, LastName, id, email, PhoneNumber, isAdmin }
            if (user && user.Password) {
                const isMatch = await bcrypt.compare(password, user.Password)
                if (isMatch) {
                    const token = generateToken(res, userInfo.id, userInfo, false)
                    return res.cookie('token', token).status(200).json({ userInfo, buisnessID: BuisnessID })
                }
                else
                    return res.sendStatus(401)
            }
            else
                return res.sendStatus(402)
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