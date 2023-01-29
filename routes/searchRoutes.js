const express = require('express');
const searchRouter = express.Router();
const searchController = require('../controllers/searchController');

searchRouter.get('/', searchController.renderBrowser);
searchRouter.get('/:title', searchController.getMovieDetails);

module.exports = searchRouter;