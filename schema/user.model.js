const mongoose = require('mongoose');


let User = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        require: true,
    },
    fullName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    roll: {
        type: String,
        require: true,
        default: 'user',
        enum: ['admin', 'user']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('User', User);