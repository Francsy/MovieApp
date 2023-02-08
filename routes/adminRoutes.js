const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');

// Render the admin page with all the movies, with a create button, edit button on each movie by Mongo id and a remove button
adminRouter.get('/', adminController.renderAdminPage);

// Render create movie page with a form for posting it to the Mongo db
adminRouter.get('/createmovie', adminController.renderAdminCreate);

// Render the edit movie page
adminRouter.get('/editmovie/:movieId', adminController.renderAdminEdit);

// Post from the form for creating. It sends all the data through req.body
adminRouter.post('/createmovie', adminController.createMovie);

// Post from the form for editing. It sends all the data through req.body
adminRouter.post('/editmovie/:movieId', adminController.editMovie);

// Remove a movie just be clicking the button
adminRouter.delete('/removeMovie/:movieId', adminController.deleteMovie)

module.exports = adminRouter;