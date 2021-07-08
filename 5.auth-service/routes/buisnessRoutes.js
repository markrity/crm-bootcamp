
const express = require('express');
const generateToken = require('../generateToken')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config();
var db = require('../db');
var Mailgun = require('mailgun-js');
const router = express.Router();



router.get('/getEmployees', (req, res) => {
    console.log("IIM heree")
    let sql = `SELECT * FROM users WHERE id='${req.user.id}'`;
    db.query(sql, async (err, data) => {
        console.log(data[0])
        if (err)
            return res.sendStatus(500)
        const { BuisnessID } = data[0]
        console.log(BuisnessID)
        sql = `SELECT * FROM users WHERE buisnessID='${BuisnessID}' AND isAdmin=0`
        db.query(sql, async (err, data) => {
            console.log(data)
            if (err)
                return res.sendStatus(500)
            return res.status(200).json({ employees: data, buisnessID: BuisnessID })
        })
    })
})



router.post('/removeEmployee', (req, res) => {
    console.log(req.body)
    const { id, buisnessID } = req.body
    let sql = `DELETE FROM users WHERE id='${id}'`
    db.query(sql, async (err, data) => {
        if (err)
            return res.sendStatus(500)
        sql = `SELECT * FROM users WHERE buisnessID='${buisnessID}' AND isAdmin=0`
        db.query(sql, async (err, data) => {
            console.log(data)
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            return res.status(200).json(data)
        })
    })
})

router.post('/inviteEmployee', (req, res) => {
    const { email, buisnessID } = req.body
    var mailgun = new Mailgun({ apiKey: process.env.apiKey, domain: process.env.domain });
    var data = {
        from: process.env.email,
        //The email to contact
        to: email,
        //Subject and text data  
        subject: 'You Have Been Invited',
        html: '<h1>Click on the link below to register</h1> <a href="http://localhost:3000/auth/newEmployee/valid?email=' + email + '&buisnessID=' + buisnessID + '">Im Clickable!</a>'
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



module.exports = router