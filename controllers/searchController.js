const axios = require('axios');
const sharp = require('sharp');

const renderBrowser = async (req, res, next) => {
    if (!req.query.searchEx) {
        res.status(200).render('browser')
    }
    else {
        try {
            const { searchEx } = req.query;
            let movieRes = await fetch(`https://www.omdbapi.com/?s=${searchEx}&apikey=${process.env.OMDB_KEY}`);
            const moviesFounds = await movieRes.json();
            let moviesFoundsArr = moviesFounds.Search;
            moviesFoundsArr = moviesFoundsArr.filter(film => film.Poster !== 'N/A');
            if (moviesFoundsArr.length === 0) {
                res.status(200).render('browser', { message: "Not results available" });
            } else {
                res.status(200).render('browser', { "movies": moviesFoundsArr, "search": searchEx });
            }
        } catch (err) {
            next(err)
        }
    }
}

const getMovieDetails = async (req, res, next) => {
    try {
        const { title } = req.params
        const movieRes = await fetch(`https://www.omdbapi.com/?t=${title}&plot=full&apikey=${process.env.OMDB_KEY}`);
        const movie = await movieRes.json();
        res.status(200).render('movie', { movie});
    } catch (err) {
        next(err)
    }
}

module.exports = {
    renderBrowser,
    getMovieDetails
}