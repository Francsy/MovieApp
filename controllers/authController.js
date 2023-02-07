const regex = require('../utils/regex')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const users = require('../models/usersPGSQL');
const jwt = require('jsonwebtoken');
const jwt_key = process.env.JWT_KEY;



// Renderiza pagina inicial con formulario de autenticación: 

const renderLogin = (req, res) => {
    res.status(200).render('login')
}

// Renderiza pagina de registro de usuario:

const renderSignup = (req, res) => {
    res.status(200).render('signUp')
}

// Recibe email y contraseña para logear al usuario:

const postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        let data = await users.getUserData(email)
        const { user_id, password: dbPassword, role } = data[0];
        const match = await bcrypt.compare(password, dbPassword);
        if (match) {
            await users.changeStatusToTrue(email)
            const userForToken = {
                email,
                id: user_id
            };
            const token = jwt.sign(userForToken, jwt_key, { expiresIn: '20m' });
            res.cookie('access-token', token, {
                httpOnly: true
                // secure: process.env.NODE_ENV === "production"
            })
            role === 'user' ? res.status(200).redirect('/u/search') : res.status(200).redirect('/admin')
        } else {
            res.status(400).json({ msg: 'Incorrect user or password' });
        }
    } catch (err) {
        console.log(err);
    }
}

// Recibe email y contraseña para registrar usuario:

const postSignUp = async (req, res) => {
    try {
        const { email, password, passwordCheck, role } = req.body;
        if (password === passwordCheck) {
            const hashPassword = await bcrypt.hash(password, saltRounds);
            if (regex.validateEmail(email) && regex.validatePassword(password)) {
                let data = await users.createUser(email, hashPassword, role);
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
        console.log(req.decoded.email)
        await users.changeStatusToFalse(req.decoded.email)
        req.session.destroy();
        res.clearCookie('access-token').redirect('/');
    } catch (err) {
        console.log(err)
    }
}


// Renderiza pagina de recuperación de password:

const renderRecoverPassword = (req, res) => {
    res.status(200).render('recoverPassword')
}

// Envia un post para la recuperación de password
const postRecoverPassword = (req, res) => {
    console.log('Pidiendo password')
}

module.exports = {
    renderLogin,
    renderSignup,
    postLogin,
    postSignUp,
    renderRecoverPassword,
    postRecoverPassword,
    logOut
}