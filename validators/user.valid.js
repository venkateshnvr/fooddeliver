// const { request } = require('express');
const { check } = require('express-validator');


module.exports = function userVlidator(req, res, next) {
    try {
        if (!check(req.body.email).isEmail().isEmpty) {
            res.status(400).send('please check email..')
        } else if (!check(req.body.password).isLength({ min: 5 })) {
            res.status(400).send('password length must be 6..')
        }
        return next()

    } catch (err) {
        console.log(err.mapped()); // Oh noes!
    }
}
