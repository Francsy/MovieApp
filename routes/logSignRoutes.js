const express = require('express');
const logSignRouter = express.Router();
const logSignController = require('../controllers/logSignController');

logSignRouter.get('/', logSignController.renderLogin);
logSignRouter.get('/signup', logSignController.renderSignup);
logSignRouter.get('/recoverpassword', logSignController.renderRecoverPassword);
logSignRouter.post('/login', logSignController.postLogin);
logSignRouter.post('/signup', logSignController.postSignup);

module.exports = logSignRouter;