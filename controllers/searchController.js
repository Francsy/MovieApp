const Movie = require('../models/movies')
const entries = require('../models/userMyMovies');

const renderBrowser = async (req, res, next) => {
    if (!req.query.searchEx) {
        res.status(200).render('browser')
    } else {
        try {
            const { searchEx } = req.query;
            let movieRes = await fetch(`https://www.omdbapi.com/?s=${searchEx}&type=movie&apikey=${process.env.OMDB_KEY}`);
            const moviesFounds = await movieRes.json();
            let moviesFoundsArr = moviesFounds.Search;
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
                moviesFoundsArr = moviesFoundsArr.filter(film => film.Poster !== 'N/A');
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

const getMoviesById = async (req, res) => {
    console.log(req.params.userid);
    let movies = await entries(parseInt(req.params.userid));
    res.render('userMyMovies', { movies });
}

const postMoviesById = async (req, res) => {
    console.log(req.body.Title);
    console.log(req.params.userid);
    try {
        const title = req.body.Title;
        if (!title) {
            return res.status(400).send({ error: 'Title is required' });
        }
        const userid = req.params.userid;
        const result = await entries(title, userid);
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to add movie to favorites' });
    }
};

module.exports = {
    renderBrowser,
    getMovieDetails,
    getMoviesById,
    postMoviesById
}