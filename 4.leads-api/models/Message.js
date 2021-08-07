const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})



module.exports = mongoose.model('Message', messageSchema);