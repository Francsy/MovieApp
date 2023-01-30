const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');

adminRouter.get('/', adminController.renderAdminBrowser);
adminRouter.get('/createmovie', adminController.getAdminCreate);
adminRouter.get('/editmovie', adminController.getAdminEdit); //FALTA /:id
adminRouter.get('/:title', adminController.getAdminMovie);

module.exports = adminRouter;