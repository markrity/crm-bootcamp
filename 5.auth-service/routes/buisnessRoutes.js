
const express = require('express');
const generateToken = require('../scripts/generateToken')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config();
const db = require('../db');
const Mailgun = require('mailgun-js');
const generateEmail = require('../scripts/generateEmail');
const router = express.Router();
const INVITE_EMPLOYEE = "Invite Employee"
const INVITE_EMPLOYEE_SUBJECT = "You Are Invited To Join"



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
    generateEmail(INVITE_EMPLOYEE, INVITE_EMPLOYEE_SUBJECT, { email, buisnessID })
})

router.post('/editEmployee', (req, res) => {
    const { form, employeeID, buisnessID } = req.body
    sql = `UPDATE users SET email = '${form.email.value}' ,
          FirstName = '${form.firstName.value}' ,
          LastName = '${form.lastName.value}',
          PhoneNumber = '${form.phoneNumber.value}'
          WHERE id = '${employeeID}'`
    db.query(sql, async (err, data) => {
        if (err)
            return res.sendStatus(500)
        sql = `SELECT * FROM users WHERE buisnessID='${buisnessID}' AND isAdmin=0`
        db.query(sql, async (err, data) => {
            console.log(data)
            if (err) {
                return res.sendStatus(500)
            }
            return res.status(200).json(data)
        })
    })
})


module.exports = router