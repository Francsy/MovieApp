const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const users = require('../models/usersPGSQL');
const jwt = require("jsonwebtoken");
const jwt_key = process.env.JWT_KEY

// Establish the Google strategy with our project credentials
passport.use(new GoogleStrategy({
    clientID: `${process.env.CLIENT_ID}`,
    clientSecret: `${process.env.CLIENT_SECRET}`,
    callbackURL: `http://localhost:3000/google/callBack`,
    proxy: true
},
    async function (request, accessToken, refreshToken, profile, done) {
        // Check if the user already exists in our users db
        const currentUser = await users.checkGoogleUser(profile.id);
        if (currentUser.length > 0) {
            // Yes. Change the logged_in status to true
            await users.changeStatusToTrue(profile._json.email)
        } else {
            // No. Create the user at the db
            await users.createUser(profile._json.email, hashPassword = null, role = "user", profile.id)
        }
        // Take the user data out of the function
        let data = await users.getUserData(profile._json.email)
        const { user_id } = data[0];
        profile.user_id = user_id;
        profile.email = profile._json.email;
        done(null, profile)
    }
));

// Serialize the user data
passport.serializeUser(function (user, done) {
    done(null, user)
});
// Deserialize the user data
passport.deserializeUser(function (user, done) {
    done(null, user)
});

// Ask the user to choose a Google account to enter to the app. Take email and profile data
const googlePrompt = (req, res, next) => {
    return passport.authenticate("google", { scope: ['email', 'profile'], prompt: "select_account" })(req, res, next);
}

const authFailOrSuccess = (req, res, next) => {
    // Try to authenticate the user
    passport.authenticate('google', async (err, user) => {
        // The authentication failed. Redirect to the failure route
        if (err || !user) {
            return res.redirect('/google/auth/failure');
        }
        // Create a cookie to navigate the website. It contains the user's email and id of at the db
        const payload = {
            email: user.email,
            id: user.user_id
        };
        const token = jwt.sign(payload, jwt_key, {
            expiresIn: "20m"
        });
        res.cookie("access-token", token, {
            httpOnly: true,
        }).redirect("/u/search"); // Redirect to the browser page
    })(req, res, next);
};

// Tells the user something went wrong at the Google auth
const googleAuthFail =  (req, res) => {
    res.send('Something went wrong..')
}

module.exports = {
    googlePrompt,
    authFailOrSuccess,
    googleAuthFail
}