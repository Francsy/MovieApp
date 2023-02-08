const regex = require('../utils/regex')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const users = require('../models/usersPGSQL');
const jwt_key = process.env.JWT_KEY;
const transporter = require('../config/nodemailer');
const urlRecoverPassword = process.env.URL_RECOVER;
const jwt_secret = process.env.ULTRA_SECRET_KEY;
const jwt = require('jsonwebtoken');

// Render the home page with an auth form
const renderLogin = (req, res) => {
    res.status(200).render('login')
}

// Render the sign up view
const renderSignup = (req, res) => {
    res.status(200).render('signUp')
}

// Recieve the email and password for user login 
const postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Get the data from the user at the postgres db
        let data = await users.getUserData(email)
        const { user_id, password: dbPassword, role } = data[0];
        // Check if the password matches with the hashed password at the db
        const match = await bcrypt.compare(password, dbPassword);
        if (match) {
            // Change the logged_in status of the user to true
            await users.changeStatusToTrue(email)
            const userForToken = {
                email,
                id: user_id
            };
            // Sign a token for the user to navigate in the website
            const token = jwt.sign(userForToken, jwt_key, { expiresIn: '20m' });
            res.cookie('access-token', token, {
                httpOnly: true
                // secure: process.env.NODE_ENV === "production"
            })
            // Check the user's role and redirect to its corresponding route
            role === 'user' ? res.status(200).redirect('/u/search') : res.status(200).redirect('/admin')
        } else {
            res.status(400).json({ msg: 'Incorrect user or password' });
        }
    } catch (err) {
        console.log(err);
    }
}

// Recieve the email and password for user sign up. It also takes the role the user choose
const postSignUp = async (req, res) => {
    try {
        const { email, password, passwordCheck, role } = req.body;
        // Check if password and confirmation password match
        if (password === passwordCheck) {
            // Hash the password so we cannot see it
            const hashPassword = await bcrypt.hash(password, saltRounds);
            // Check if the email is well formed and the password is safe through regex
            if (regex.validateEmail(email) && regex.validatePassword(password)) {
                // Create the user row at the postgres db
                let data = await users.createUser(email, hashPassword, role);
                console.log(data)
                // Redirect the user to the login page
                res.redirect('/')
            } else {
                res.status(400).json({ msg: 'Invalid email or password' })
            }
        } else {
            res.status(400).json({ msg: 'You didn´t write the same password' })
        }
    } catch (error) {
        console.log('Error:', error);
    }
}

const logOut = async (req, res) => {
    try { 
        // Change the logged_in status of the user to false
        await users.changeStatusToFalse(req.decoded.email)
        // Destroy the user session data, remove the access-token cookie and redirect the user to the login page
        req.session.destroy();
        res.clearCookie('access-token').redirect('/');
    } catch (err) {
        console.log(err)
    }
}


// Render the recover password view when the user does not remember his password
const renderRecoverPassword = (req, res) => {
    res.status(200).render('recoverPassword')
}

const recoverPassword = async (req, res) => {
    // Check if the email exists in the database
    const user = await users.getUserData(req.body.email);
    // Check if the user result array is empty
    if (!user.length) { 
        return res.status(400).json({
            error: 'Email not registered'
        });
    }

    try {
        // Sign a token for recovering the password
        const recoverToken = jwt.sign({ email: email }, jwt_secret, { expiresIn: '20m' });
        // Send an email that provides an url with the token written at its end
        const url = `${urlRecoverPassword}resetpassword/` + recoverToken;
        await transporter.sendMail({
            to: email,
            subject: 'Recover Password',
            html: `<h3>Recover Password</h3>
                <a href = ${url}>Click to recover password</a>
                <p>Link will expire in 20 minutes</p>`
        });
        res.status(200).json({
            message: 'A recovery email has been sent to your mail direction'
        })
    } catch (error) {
        console.log('Error:', error)
    }
};

// Render the reset password view and take the recover token from the url
const renderResetPassword = (req, res) => {
    const token = req.params.recoverToken;
    res.status(200).render('resetPassword', { token })
}

const resetPassword = async (req, res) => {
    try {
        // Check if the token is correct
        const recoverToken = req.params.recoverToken;
        const payload = jwt.verify(recoverToken, jwt_secret);
        const password = req.body.newPassword
        if (password === req.body.newPasswordCheck) {
            if (regex.validatePassword(password)) {
                const hashPassword = await bcrypt.hash(password, saltRounds);
                await users.setNewPassword(payload.email, hashPassword)
                console.log('password changes')
            } else {
                res.status(400).json({ msg: 'Password must have at least 8 characters, one uppercase, one lowercase and one special character' });
            }
            res.status(200).redirect("/");
        } else {
            res.status(400).json({ msg: 'Passwords did not match' });
        }

    } catch (error) {
        console.log('Error:', error);
    }
}

module.exports = {
    renderLogin,
    renderSignup,
    postLogin,
    postSignUp,
    renderRecoverPassword,
    recoverPassword,
    renderResetPassword,
    resetPassword,
    logOut
}