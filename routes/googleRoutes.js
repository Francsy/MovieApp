const express = require('express');
const googleRouter = express.Router();
const googleController = require('../controllers/googleController');

// Render the Google prompt 
googleRouter.get("/auth", googleController.googlePrompt);

// This route has two functions. The first one, in case of failure, redirects to /auth/failure. The second one, in case os success, goes ahead with auth
googleRouter.get("/callBack", googleController.authFailOrSuccess);

// Route for failure
googleRouter.get('/auth/failure', googleController.googleAuthFail);

module.exports = googleRouter