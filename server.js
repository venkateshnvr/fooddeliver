"use strict";
const express = require('express');
const mongodbConnection = require('./db.connections/mongdb');
const userRouter = require('./apis/user.api');
const foodItemsRouter = require('./api/')
const cors = require('cors')


mongodbConnection()

let app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())
// app.use(express.json())
// app.use(User)
// app.use(authUser)

//router
app.use('/api', userRouter)
app.use('/api', foodItemsRouter)


let PORT = process.env.PORT || 2001;

app.listen(PORT, (err) => {
    if (err) {
        return console.log('port error')
    }
    return console.log(`connected to port...${PORT}`)
});

// function setUser(req, res, next) {
//     let userId = req.body.userId
//     console.log('userId', userId)
//     if (userId) {
//         req.user = User.findOne({_id: userId})
//         console.log('req.user', req.user)
//     }
//     next()
// }