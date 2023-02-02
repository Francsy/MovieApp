const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');

adminRouter.get('/', adminController.renderAdminPage);

adminRouter.get('/createmovie', adminController.getAdminCreate);
adminRouter.post('/createmovie', adminController.createMovie);

adminRouter.get('/editmovie/:Title', adminController.getAdminEdit); 
adminRouter.post('/editmovie/:Title', adminController.editMovie);

adminRouter.delete('/deletemovie/:Title', adminController.deleteMovie);


module.exports = adminRouter;