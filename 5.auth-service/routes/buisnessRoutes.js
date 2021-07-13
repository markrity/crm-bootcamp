
const express = require('express');
const generateToken = require('../generateToken')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config();
const db = require('../db');
const Mailgun = require('mailgun-js');
const router = express.Router();



router.get('/getEmployees', (req, res) => {
    let sql = `SELECT * FROM users WHERE id='${req.user.id}'`;
    db.query(sql, async (err, data) => {
        if (err)
            return res.sendStatus(500)
        const { BuisnessID } = data[0]
        sql = `SELECT * FROM users WHERE buisnessID='${BuisnessID}' AND isAdmin=0`
        db.query(sql, async (err, data) => {
            if (err)
                return res.sendStatus(500)
            return res.status(200).json({ employees: data, buisnessID: BuisnessID })
        })
    })
})



router.post('/removeEmployee', (req, res) => {
    const { id, buisnessID } = req.body
    let sql = `DELETE FROM users WHERE id='${id}'`
    db.query(sql, async (err, data) => {
        if (err)
            return res.sendStatus(500)
        sql = `SELECT * FROM users WHERE buisnessID='${buisnessID}' AND isAdmin=0`
        db.query(sql, async (err, data) => {
            if (err) {
                return res.sendStatus(500)
            }
            return res.status(200).json(data)
        })
    })
})

router.post('/inviteEmployee', (req, res) => {
    const { email, buisnessID } = req.body
    const mailgun = new Mailgun({ apiKey: process.env.apiKey, domain: process.env.domain });
    const data = {
        from: process.env.email,
        to: email,
        subject: 'You Have Been Invited',
        html: '<h1>Click on the link below to register</h1> <a href="http://localhost:3000/auth/newEmployee/valid?email=' + email + '&buisnessID=' + buisnessID + '">Im Clickable!</a>'
    }
    mailgun.messages().send(data, function (err, body) {
        if (err) {
            return res.sendStatus(401)
        }
        else {
            return res.sendStatus(200)
        }
    });
})



module.exports = router