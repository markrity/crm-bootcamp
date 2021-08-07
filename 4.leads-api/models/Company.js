const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    rooms: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Room',
        unique: true,
        default: []
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Company', companySchema);
