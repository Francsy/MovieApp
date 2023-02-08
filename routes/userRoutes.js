const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const verifiedToken = require('../middlewares/verifiedToken').userProtector;

// Render the browser page without movies and with them
userRouter.get('/search', userController.renderBrowser);

// Render the detailed movie view, with a favourites button and comments from web scraping
userRouter.get('/search/:id', userController.renderMovieDetails); 

// Render the user's favourites page. Each movie has a favourites button
userRouter.get('/movies', verifiedToken, userController.renderUserFavs); //http://localhost:3000/u/movies/

// Post a movie to the user's favourites list
userRouter.post('/movies', verifiedToken, userController.addFav);

// Delete a movie from the user's favourites list
userRouter.delete('/movies', verifiedToken, userController.deleteFav);

// Render the page with the restore password form
userRouter.get('/restorepassword', userController.renderRestorePassword);

// Recieve the actual password and the new one twice
userRouter.post('/restorepassword', userController.changePassword);

module.exports = userRouter;