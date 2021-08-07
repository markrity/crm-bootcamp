const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isTyping: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', userSchema);