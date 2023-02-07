const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 465,
    secure: true,
    auth: {
        user: process.env.SECRET_EMAIL_DIRECTION,
        pass: process.env.JWT_KEY
    }
});

module.exports = transporter;