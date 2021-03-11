const express = require('express');
const User = require('../schema/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const userVlidator = require('../validators/user.valid');
// const matchedData = require('express-validator');
const verifyToken = require('./../permissions/jwt.token.verify');

dotenv.config();


let route = express.Router();


route.post('/user', userVlidator, async (req, res) => {
    let { email, password, fullName, userName } = req.body
    let hashPassword = await bcrypt.hash(password, 10)
    let newUser = await new User({ email, password: hashPassword, fullName, userName })
    let accessToken = jwt.sign({ userId: newUser._id, roll: newUser.roll }, process.env.SECREAT_KEY, {
        expiresIn: "1d"
    });
    newUser.save()
        .then(() => res.status(200).json({
            data: newUser,
            accessToken
        }))
        .catch(err => console.log(err))
})


route.post('/login', async (req, res) => {
    let { email, password } = req.body
    User.findOne({ email })
        .then(data => {
            let match = bcrypt.compare(password, data.password);
            if (!match) res.status(400).json({ err: "password doesnt match" })
            let accessToken = jwt.sign({ userId: data._id, roll: data.roll }, process.env.SECREAT_KEY, {
                expiresIn: "1d"
            });
            User.findByIdAndUpdate(data._id, { accessToken })
            res.status(200).json({
                userId: data._id,
                roll: data.roll,
                accessToken
            })
        })
        .catch(err => console.log(err))
})

route.get('/reddy', verifyToken, async (req, res) => {
    User.findById(req.userId, {password: 0}, (user, err) => {
        console.log(user)
    })
    // .then(data => res.status(200).json(data.email))
    // .catch(err => console.log("...", err))
})


module.exports = route;