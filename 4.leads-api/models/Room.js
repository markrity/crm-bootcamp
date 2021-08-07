const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    conversation: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Message',
        default: []
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    crm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isOnline: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Room', roomSchema);