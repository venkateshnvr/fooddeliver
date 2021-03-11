const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

let mongoUrl = process.env.MONGODB_ATLAS
let mongodbConnection = () => {
    mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('mongodb connected'))
    .catch(() => console.log("not connected to mongodb"))
}

module.exports = mongodbConnection;
