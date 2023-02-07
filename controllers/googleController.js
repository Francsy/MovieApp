const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const users = require('../models/usersPGSQL');
const jwt = require("jsonwebtoken");
const jwt_key = process.env.JWT_KEY

//Establecemos la estrategia de Google con los credenciales de nuestro proyecto
passport.use(new GoogleStrategy({
    clientID: `${process.env.CLIENT_ID}`,
    clientSecret: `${process.env.CLIENT_SECRET}`,
    callbackURL: `http://localhost:3000/google/callBack`,
    proxy: true
},
    async function (request, accessToken, refreshToken, profile, done) {
        const currentUser = await users.checkGoogleUser(profile.id);
        if (currentUser.length > 0) {
            await users.changeStatusToTrue(profile._json.email)
        } else {
            await users.createUser(profile._json.email, hashPassword = null, role = "user", profile.id)
        }
        let data = await users.getUserData(profile._json.email)
        const { user_id } = data[0];
        profile.user_id = user_id;
        profile.email = profile._json.email;
        done(null, profile)
    }
));

//Esta función determina los datos que se van a guardar en la sesión de google: user
passport.serializeUser(function (user, done) {
    done(null, user)
});
//Determina que objeto borrar de la sesión: user
passport.deserializeUser(function (user, done) {
    done(null, user)
});

const googlePrompt = (req, res, next) => {
    return passport.authenticate("google", { scope: ['email', 'profile'], prompt: "select_account" })(req, res, next);
}


const authFailOrSuccess = (req, res, next) => {
    passport.authenticate('google', async (err, user) => {
        if (err || !user) {
            return res.redirect('/google/auth/failure');
        }
        //req.session.user = user;
        const payload = {
            //check: true
            email: user.email,
            id: user.user_id
        };
        const token = jwt.sign(payload, jwt_key, {
            expiresIn: "20m"
        });
        res.cookie("access-token", token, {
            httpOnly: true,
        }).redirect("/u/search");
    })(req, res, next);
};


const googleAuthFail =  (req, res) => {
    res.send('Something went wrong..')
}

/*
const googleLogOut = async (req, res) => {
    await users.changeStatusToFalse(req.session.user._json.email);
    req.logout(function (err) {
        if (err) { return next(err); }
        //req.session.destroy();
        res.clearCookie("access-token").redirect('/');
    });
}
*/

module.exports = {
    googlePrompt,
    authFailOrSuccess,
    googleAuthFail,
    // googleLogOut
}