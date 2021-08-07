const express = require("express");
const router = express.Router();
const { Client } = require("@elastic/elasticsearch");

const bodyParser = require("body-parser").json();
const client = new Client({
    node: "http://localhost:9200",

});


router.post("/domEvents", bodyParser, (req, res) => {
    console.log(req.body)
    client.bulk({
        body: req.body,
    })
        .then((resp) => {
            return res.status(200).json({
                msg: "event indexed",
            });
        })
        .catch((err) => {
            return res.status(500).json({
                msg: "Error",
                err,
            });
        });
});
module.exports = router;