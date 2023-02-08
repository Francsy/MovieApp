const express = require('express');
const jwt = require('jsonwebtoken');
const users = require('../models/usersPGSQL');
const jwt_key = process.env.JWT_KEY;

const adminProtector = express.Router();
const userProtector = express.Router();
const logOutProtector = express.Router();

// Protect the admin routes
adminProtector.use(async (req, res, next) => {
    // Ask for the access-token
    const token = req.cookies['access-token'];
    if (!token) return res.json({ msg: 'Token not provided' }); // No token
    try {
        const decoded = jwt.verify(token, jwt_key);
    
        if ((decoded.exp * 1000) < Date.now()) return res.json({ msg: 'Expired token' }); // Token had expired
        
        const userData = await users.getRole(decoded.email);
        if (!userData || userData[0].logged_in !== true || userData[0].role !== "admin") return res.json({ msg: 'Invalid token' }); // Token verification failed

        const userForToken = {
            email: decoded.email,
            id: decoded.id
        };
        const newToken = jwt.sign(userForToken, jwt_key, { expiresIn: '20m' }); // Renew the admin toker
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

// Protect the user routes
userProtector.use(async (req, res, next) => {
    const token = await req.cookies['access-token']; 
    if (!token) return res.json({ msg: 'Token not provided' }); // No token
    try {
        const decoded = jwt.verify(token, jwt_key);
    
        if ((decoded.exp * 1000) < Date.now()) return res.json({ msg: 'Expired token' }); // Token had expired
        
        const userData = await users.getRole(decoded.email);
        if (!userData || userData[0].logged_in !== true || userData[0].role !== "user") return res.json({ msg: 'Invalid token' }); // Token verification failed

        const userForToken = {
            email: decoded.email,
            id: decoded.id
        };
        const newToken = jwt.sign(userForToken, jwt_key, { expiresIn: '20m' }); // Renew the user token
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

// Protect the log out route
logOutProtector.use(async (req, res, next) => {
    const token = req.cookies['access-token'];
    if (!token) return res.json({ msg: 'Token not provided' }); // No token
    try {
        const decoded = jwt.verify(token, jwt_key);

        if ((decoded.exp * 1000) < Date.now()) return res.json({ msg: 'Expired token' }); // Token had expired

        const userData = await users.getRole(decoded.email);
        if (!userData || userData[0].logged_in !== true) return res.json({ msg: 'Invalid token' }); // Token verification failed
        req.decoded = decoded;
        next();
    } catch (error) {
        return res.json({ msg: 'Invalid token' });
    }
});

module.exports = {
    adminProtector,
    userProtector,
    logOutProtector
}