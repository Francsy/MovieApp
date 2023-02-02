const express = require('express');
const searchRouter = express.Router();
const searchController = require('../controllers/searchController');

searchRouter.get('/', searchController.renderBrowser);
searchRouter.get('/:title', searchController.getMovieDetails);
searchRouter.get('/movies/:userid', searchController.getMoviesById); //http://localhost:3000/search/movies/22
searchRouter.post('/movies/:userid', searchController.postMoviesById);

module.exports = searchRouter;