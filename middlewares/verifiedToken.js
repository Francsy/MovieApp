const express = require('express');
const jwt = require('jsonwebtoken');
const users = require('../models/usersPGSQL');
const jwt_key = process.env.JWT_KEY;

const adminProtector = express.Router();
const userProtector = express.Router();

adminProtector.use((req, res, next) => {
    const token = req.cookies['access-token'];
    if (token) {
        jwt.verify(token, jwt_key, async (err, decoded) => {
            let data = await users.getRole(decoded.email);
            const { role, logged_in } = data[0];
            if (logged_in == true && role === "admin") {
                req.decoded = decoded;
                next();
            } else {
                return res.json({ msg: 'Invalid token' });
            }
        });
    } else {
        res.send({
            msg: 'Token not provided'
        });
    }
});

userProtector.use((req, res, next) => {
    const token = req.cookies['access-token'];
    if (token) {
        jwt.verify(token, jwt_key, async (err, decoded) => {
            let data = await users.getRole(decoded.email);
            const { role, logged_in } = data[0];
            if (logged_in == true && role === "user") {
                req.decoded = decoded;
                next();
            } else {
                return res.json({ msg: 'Invalid token' });
            }
        });
    } else {
        res.send({
            msg: 'Token not provided'
        });
    }
});


module.exports = {
    adminProtector,
    userProtector
}