var redis = require('redis');
const express = require('express')
const router = express.Router();
var publisher = redis.createClient();


router.post("/Customers", (req, res) => {
    console.log("IN Custoemrs")
    publisher.publish('emails', "test",
        () => {
            console.log("Sent all Emails")
        });
});

router.post('/Employees', (req, res) => {
    console.log("IN Employees")

})

module.exports = router;