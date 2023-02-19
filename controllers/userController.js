const regex = require('../utils/regex')
const bcrypt = require('bcrypt');
const Movie = require('../models/movieMongo')
const favMovies = require('../models/favMoviesPGSQL');
const users = require('../models/usersPGSQL')
const saltRounds = 10;
const scraper = require('../utils/scraper')
const { notFromGoogle } = require('../models/usersPGSQL')

// Render the browser page without movies and show movies from the api and the Mongo db when the user has done a search
const renderBrowser = async (req, res, next) => {
    // Check if a user is from Google
    let notGoogleUser = await notFromGoogle(req.decoded.email);
    // No search has been done
    if (!req.query.search) {
        res.status(200).render('userBrowser', {notGoogleUser})
    } else {
        // The search has been done
        try {
            const { search } = req.query;
            // Fetch movies from the api
            let movieRes = await fetch(`https://www.omdbapi.com/?s=${search}&type=movie&apikey=${process.env.OMDB_KEY}`);
            const moviesFounds = await movieRes.json();
            let moviesFoundsArr = moviesFounds.Search;
            // Check if any movie has been found at the api fetch
            if (moviesFoundsArr === undefined) { // No movie has been found. Try to find it at the Mongo db
                try {
                    let dbMovies = await Movie.find({ Title: { $regex: search, $options: "i" } })
                    if (dbMovies.length > 0) { // Movies were found. Get their data
                        let movies = dbMovies.map(film => {
                            let stringID = film['movieId'].toString();
                            return { id: stringID, title: film.Title, img: film.Poster }
                        })
                        res.status(200).render('userBrowser', { movies, search, notGoogleUser });
                    } else { // The movie has not been found
                        res.status(200).render('userBrowser', { message: "Not results available" });
                    }
                } catch (err) {
                    next(err)
                }
            } else { // Movies were found at the api. Get their data
                // Filter movies without poster
                moviesFoundsArr = moviesFoundsArr.filter(film => film.Poster !== 'N/A');
                let movies = moviesFoundsArr.map(film => {
                    return { id: film.imdbID, title: film.Title, img: film.Poster }
                })
                // Render the browser view with the movies found
                res.status(200).render('userBrowser', { movies, search, notGoogleUser });
            }
        } catch (err) {
            next(err)
        }
    }
}

// Render movie with details view, with an add to favourites button and comments taken from web scraping
const renderMovieDetails = async (req, res, next) => {
    // Check if a user is from Google
    let notGoogleUser = await notFromGoogle(req.decoded.email);
    try {
        // Fetch the movie data from the api
        const movieRes = await fetch(`https://www.omdbapi.com/?i=${req.params.id}&plot=full&apikey=${process.env.OMDB_KEY}`);
        const apiMovie = await movieRes.json();
        if (apiMovie.Response === 'False') { // The movie was not found at the api. Look at the Mongo db
            const dbMovie = await Movie.findOne({ movieId: req.params.id }, { "_id": 0, "__v": 0 })
            let movie = {
                title: dbMovie.Title,
                year: dbMovie.Year,
                runtime: dbMovie.Runtime,
                genre: dbMovie.Genre,
                director: dbMovie.Director,
                writer: dbMovie.Writer,
                actors: dbMovie.Actors,
                plot: dbMovie.Plot,
                img: dbMovie.Poster,
                rating: dbMovie.imdbRating,
                id: dbMovie.movieId

            }
            let movieWasAdded = await favMovies.checkMovieInFavorites(req.decoded.id, movie.id)
            res.status(200).render('userMovie', { movie, notGoogleUser, movieWasAdded });
        }
        let movie = {
            title: apiMovie.Title,
            year: apiMovie.Year,
            runtime: apiMovie.Runtime,
            genre: apiMovie.Genre,
            director: apiMovie.Director,
            writer: apiMovie.Writer,
            actors: apiMovie.Actors,
            plot: apiMovie.Plot,
            img: apiMovie.Poster,
            rating: apiMovie.imdbRating,
            id: apiMovie.imdbID
        }
        let movieWasAdded = await favMovies.checkMovieInFavorites(req.decoded.id, movie.id)
        // Get the comments from web scraping
        try {
            const [critics, specialReview] = await Promise.all([
                scraper.getFACritics(movie.title),
                scraper.getRTReview(movie.title)
            ]);
            res.status(200).render('userMovie', { movie, critics, specialReview, notGoogleUser, movieWasAdded }); 
        } catch (err) {
            console.error(err);
            res.status(200).render('userMovie', { movie, notGoogleUser, movieWasAdded });
        }
    } catch (err) {
        next(err)
    }
}

//Render the favourites view. Each movie has a delete button
const renderUserFavs = async (req, res) => {
    // Check if a user is from Google
    let notGoogleUser = await notFromGoogle(req.decoded.email);
    // Get movies by the user's id
    const { id } = req.decoded;
    const movies = await favMovies.getMoviesByUser(id);
    if (!movies[0]) { // No movies were found. Tell the user so
        res.render('userMyMovies', { title: 'You didn´t save any movie yet', notGoogleUser })
    } else { // Show the user's favourite movies
        res.render('userMyMovies', { movies, title: 'User´s Favorite Movies', notGoogleUser });
    }
}

//Post from a movie to the user's favourites list
const addFav = async (req, res) => {
    try {
        const { movie_title, movie_id, movie_poster } = req.body;
        if (!movie_title) { // The movie's title was not provided
            return res.status(400).send({ error: 'Title is required' });
        }
        const { id } = req.decoded;
        const userid = id;
        const result = await favMovies.postMovieById(userid, movie_id, movie_title, movie_poster);
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to add movie to favorites' });
    }
};

// Delete the movie from the user's favourites list
const deleteFav = async (req, res) => {
    try {
        const { id } = req.decoded;
        const userid = id;
        const { movie_id } = req.body;
        const response = await favMovies.deleteMovieById(userid, movie_id);
        console.log(response);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to remove movie from favorites' });
    }
}

// Render the reset password view with a form
const renderRestorePassword = (req, res) => {
    res.status(200).render('userRestorePassword')
}

// Recieve the actual password through the post form and the new one twice for validation
const changePassword = async (req, res) => {
    const { password, newPassword, newPasswordCheck } = req.body;
    // Check if the new password and the confirmation of the new password match
    if (newPassword === newPasswordCheck) {
        // Check if the new password is safe enough
        if (regex.validatePassword(newPassword)) {
            try {
                let data = await users.getUserData(req.decoded.email)
                const { password: dbPassword } = data[0];
                // Check if the user is signed up with Google. This kind of users cannot change their password
                if (dbPassword === null) {
                    res.status(403).send({
                        msj: "Google users can't change their password"
                    })
                }
                // Check if the password provided matches with the one stored in the postgres db
                const match = await bcrypt.compare(password, dbPassword);
                if (match) { // Yes. Set the new password hashing it first so we cannot see it
                    const hashNewPassword = await bcrypt.hash(newPassword, saltRounds);
                    await users.setNewPassword(req.decoded.email, hashNewPassword)
                    console.log('password changes')
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            res.status(400).json({ msg: 'Invalid new password' })
        }
    } else {
        res.status(400).json({ msg: 'You didn´t write the same password' })
    }
}

const renderAbout = async (req, res) => {
    // Check if a user is from Google
    let notGoogleUser = await notFromGoogle(req.decoded.email);
    res.status(200).render('userAbout', { notGoogleUser })
}

module.exports = {
    renderBrowser,
    renderMovieDetails,
    renderUserFavs,
    addFav,
    deleteFav,
    renderRestorePassword,
    changePassword,
    renderAbout
}