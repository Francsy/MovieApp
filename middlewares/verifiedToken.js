const express = require('express');
const jwt = require('jsonwebtoken');
const users = require('../models/usersPGSQL');
const jwt_key = process.env.JWT_KEY;
const authController = require('../controllers/authController')

const adminProtector = express.Router();
const userProtector = express.Router(); // Esto se puede unificar
const getEmailForLogOutAndRefresh = express.Router();
const userProtectorAndRefresh = express.Router()

adminProtector.use((req, res, next) => {
    const token = req.cookies['access-token'];
    if (token) {
        jwt.verify(token, jwt_key, async (err, decoded) => {
            // console.log(err)
            // Si está caducado lo elimina
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

getEmailForLogOutAndRefresh.use((req, res, next) => {
    const token = req.cookies['access-token'];
    jwt.verify(token, jwt_key, async (err, decoded) => {
        authController.logOut(decoded.email, res)
    });
});


userProtectorAndRefresh.use(async (req, res, next) => {
    const token = req.cookies['access-token'];
    if (!token) return res.json({ msg: 'Token not provided' });
    try {
        const decoded = jwt.verify(token, jwt_key);
    
        if ((decoded.exp * 1000) < Date.now()) return res.json({ msg: 'Expired token' });

        const userData = await users.getRole(decoded.email);
        if (!userData || userData[0].logged_in !== true || userData[0].role !== "user") return res.json({ msg: 'Invalid token' });

        const userForToken = {
            email: decoded.email,
            id: decoded.id
        };
        const newToken = jwt.sign(userForToken, jwt_key, { expiresIn: '20m' });
        res.cookie('access-token', newToken, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production"
        });
        req.decoded = decoded;
        next();
    } catch (error) {
        return res.json({ msg: 'Invalid token' });
    }
});



module.exports = {
    adminProtector,
    userProtector,
    userProtectorAndRefresh,
    getEmailForLogOutAndRefresh
}