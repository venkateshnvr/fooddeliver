const mongoose = require('mongoose');


let foodItems = new mongoose.Schema({
    itemName: {
        type: String,
        trim: true,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    itemImageUrl: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('foodItems', foodItems);