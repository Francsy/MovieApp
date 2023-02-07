const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.SECRET_EMAIL_DIRECTION,
        pass: process.env.ULTRA_SECRET_KEY
    }
});

module.exports = transporter;