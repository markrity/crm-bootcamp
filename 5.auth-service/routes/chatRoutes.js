const express = require('express');
const mongoose = require('mongoose');
const Company = require('../../4.leads-api/models/Company');
const Message = require('../../4.leads-api/models/Message');
const Room = require('../../4.leads-api/models/Room');
const User = require('../../4.leads-api/models/User');
const router = express.Router();

const mongouri = mongoose.connect('mongodb+srv://NivosCo:Nfn151294@cluster0.agewf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => console.log('connected in to mongo instance'));
mongoose.connection.on('error', (err) => console.error('error connecting Help', err));

module.exports = router