const express = require('express');
const logSignRouter = express.Router();
const logSignController = require('../controllers/logSignController');

logSignRouter.get('/', logSignController.renderLogin);
logSignRouter.get('/signup', logSignController.renderSignup);
logSignRouter.get('/recoverpassword', logSignController.renderRecoverPassword);
logSignRouter.get('/restorepassword', logSignController.renderRestorePassword);
logSignRouter.post('/login', logSignController.postLogin);
logSignRouter.post('/signup', logSignController.postSignup);
logSignRouter.get('/movies/:userid', logSignController.getMoviesById); //http://localhost:3000/movies/22

module.exports = logSignRouter;