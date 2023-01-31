const Movie = require('../models/movies')

const renderBrowser = async (req, res, next) => {
    if (!req.query.searchEx) {
        res.status(200).render('browser')
    } else {
        try {
            const { searchEx } = req.query;
            let movieRes = await fetch(`https://www.omdbapi.com/?s=${searchEx}&apikey=${process.env.OMDB_KEY}`);
            const moviesFounds = await movieRes.json();
            let moviesFoundsArr = moviesFounds.Search;
            moviesFoundsArr = moviesFoundsArr.filter(film => film.Poster !== 'N/A');
            if (moviesFoundsArr.length === 0) {
                try {
                    let dbMovies = await Movie.find({ Title: { $regex: searchEx, $options: "i" } })
                    if (dbMovies.length > 0) {
                        res.status(200).render('browser', { "movies": dbMovies, "search": searchEx });
                    } else {
                        res.status(200).render('browser', { message: "Not results available" });
                    }
                } catch (err) {
                    next(err)
                }
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
        const movieRes = await fetch(`https://www.omdbapi.com/?t=${req.params.title}&plot=full&apikey=${process.env.OMDB_KEY}`);
        const movie = await movieRes.json();
        if (movie.Response === 'False') {
            const dbMovie = await Movie.findOne({ Title: req.params.title }, { "_id": 0, "__v": 0 })
            res.status(200).render('movie', { dbMovie });
        }
        res.status(200).render('movie', { movie });
    } catch (err) {
        next(err)
    }
}

module.exports = {
    renderBrowser,
    getMovieDetails
}