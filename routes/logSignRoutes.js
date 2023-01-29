const express = require('express');
const logSignRouter = express.Router();
const logSignController = require('../controllers/logSignController');

logSignRouter.get('/', logSignController.renderLogin);
logSignRouter.get('/signup', logSignController.renderSignup);

module.exports = logSignRouter;