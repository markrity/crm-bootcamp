//const express = require('express');
import express from 'express'
import cors from 'cors'
const app = express();

app.use('/static', express.static('public'))

//var cors = require('cors')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', function(req, res) {
  res.sendFile(__dirname+'/events.js');
});

import elasticsearch from 'elasticsearch';
// var redis = require("redis");

import redis from "redis"
var publisher = redis.createClient();


const client = new elasticsearch.Client({
    host: 'http://localhost:9200',
    apiVersion: '6.8'
})

client.ping({
    requestTimeout: 1000
  }, function (error) {
    if (error) {
      console.trace('elasticsearch cluster is down!');
    } else {
      console.log('All is well');

    }
});


app.post('/click', function(req, res) {
   
    publisher.publish("events", "test", function(){
     process.exit(0);
    });

    const body = req.body.doc.flatMap(doc => [{ index: { _index: 'events' } }, doc])
    console.log(body);
    client.bulk({
        refresh: true,
        body,
        type: "external"
        }).then(response => {
            console.log("Indexing successful");
        })
        .catch(err => {
            console.log(err);
        })
    
    console.log('click here!!!');
    res.json({status:true});
   
});


app.post('/load', function(req, res) {
    console.log('load here!!!');
    res.json({status:true});
});

app.listen(9000, () => {
  console.log(`Server running at http://localhost:9000/`);
});





