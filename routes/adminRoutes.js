const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');

adminRouter.get('/', adminController.renderAdminPage);
adminRouter.get('/createmovie', adminController.getAdminCreate);
adminRouter.get('/editmovie/:Title', adminController.getAdminEdit); 

module.exports = adminRouter;