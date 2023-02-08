const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const { logOutProtector } = require('../middlewares/verifiedToken')

// Render the initial page with an auth form
authRouter.get('/', authController.renderLogin); 
// Render sign up page
authRouter.get('/signup', authController.renderSignup);
// Recieve email and password for logging in the user
authRouter.post('/login', authController.postLogin);
// Receive email and password for signing up the user
authRouter.post('/signup', authController.postSignUp);
// Log out the user
authRouter.get('/logout', logOutProtector, authController.logOut)

// Render the recover password page
authRouter.get('/recoverpassword/:email', authController.renderRecoverPassword);
// Post the user's email
authRouter.post('/recoverpassword/:email', authController.recoverPassword);
// Render the reset password page
authRouter.get('/resetpassword/:recoverToken', authController.renderResetPassword);
// Post the new password into the Postgres db
authRouter.post('/resetpassword/:recoverToken', authController.resetPassword);

module.exports = authRouter;