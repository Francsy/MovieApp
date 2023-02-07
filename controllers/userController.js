const regex = require('../utils/regex')
const jwt = require('jsonwebtoken');
const jwt_key = process.env.JWT_KEY;
const bcrypt = require('bcrypt');
const Movie = require('../models/movieMongo')
const favMovies = require('../models/favMoviesPGSQL');
const users = require('../models/usersPGSQL')
const urlRecoverPassword = process.env.URL_RECOVER;
const saltRounds = 10;

// Renderiza buscador sin peliculas y con peliculas de la api y de mongo cuando tiene una búsqueda hecha
const renderBrowser = async (req, res, next) => {
    console.log(req.decoded.id)
    console.log(req.decoded.email)
    if (!req.query.search) {
        res.status(200).render('userBrowser')
    } else {
        try {
            const { search } = req.query;
            let movieRes = await fetch(`https://www.omdbapi.com/?s=${search}&type=movie&apikey=${process.env.OMDB_KEY}`);
            const moviesFounds = await movieRes.json();
            let moviesFoundsArr = moviesFounds.Search;
            if (moviesFoundsArr === undefined) {
                try {
                    let dbMovies = await Movie.find({ Title: { $regex: search, $options: "i" } })
                    console.log(dbMovies)
                    if (dbMovies.length > 0) {
                        let movies = dbMovies.map(film => {
                            let stringID = film['movieId'].toString();
                            return { id: stringID, title: film.Title, img: film.Poster }
                        })
                        res.status(200).render('userBrowser', { movies, search });
                    } else {
                        res.status(200).render('userBrowser', { message: "Not results available" });
                    }
                } catch (err) {
                    next(err)
                }
            } else {
                moviesFoundsArr = moviesFoundsArr.filter(film => film.Poster !== 'N/A');
                let movies = moviesFoundsArr.map(film => {
                    return { id: film.imdbID, title: film.Title, img: film.Poster }
                })
                res.status(200).render('userBrowser', { movies, search });
            }
        } catch (err) {
            next(err)
        }
    }
}

// Renderiza pagina detallada de la pelicula, con botón para añadir a fav y comentarios por scraping:
// Faltan comentarios por scraping

const renderMovieDetails = async (req, res, next) => {
    try {
        const movieRes = await fetch(`https://www.omdbapi.com/?i=${req.params.id}&plot=full&apikey=${process.env.OMDB_KEY}`);
        const apiMovie = await movieRes.json();
        if (apiMovie.Response === 'False') {
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
            res.status(200).render('userMovie', { movie });
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
        res.status(200).render('userMovie', { movie });
    } catch (err) {
        next(err)
    }
}

// Renderiza pagina de favoritos del usuario, cada peli con botón para borrar favorito:
// Debe introducir en el front también el id de la peli (sea el de la api o el de mongo) para poder eliminar
// Por ahora pasamos la id de usuario por params
const renderUserFavs = async (req, res) => {
    const { id } = req.decoded;
    const movies = await favMovies.getMoviesByUser(id);
    if (!movies[0]) {
        res.render('userMyMovies', { title: 'You didn´t save any movie yet' })
    } else {
        res.render('userMyMovies', { movies, title: 'User´s Favorite Movies' });
    }
}

// Post de una película a lista de favoritos del usuario:
// El id de la pelicula (sea de la api o de la peli en mongo debe llegar por req.body):
// Por ahora pasamos la id de usuario por params:
const addFav = async (req, res) => {
    try {
        const { movie_title, movie_id, movie_poster } = req.body;
        if (!movie_title) {
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

const deleteFav = async (req, res) => {
        const { id } = req.decoded;
        const userid = id;
        const { movie_id } = req.body;
        const response = await favMovies.deleteMovieById(userid, movie_id);
        console.log(response);
}

// Renderiza la pagina con el formulario para cambiar contraseña:
const renderRestorePassword = (req, res) => {
    res.status(200).render('userRestorePassword')
}

// Recibe contraseña actual a través de POST y la nueva repetida dos veces para validar:
const changePassword = async (req, res) => {
    const { password, newPassword, newPasswordCheck } = req.body;
    if (newPassword === newPasswordCheck) {
        if (regex.validatePassword(newPassword)) {
            try {
                let data = await users.getUserPassword(req.decoded.email)
                const { password: dbPassword } = data[0];
                const match = await bcrypt.compare(password, dbPassword);
                if (match) {
                    const hashNewPassword = await bcrypt.hash(newPassword, saltRounds);
                    await users.setNewPassword(req.decoded.email, hashNewPassword)
                    console.log('password changes')
                }
            } catch (err) {
                console.log(err)
            }
            const token = req.cookies['access-token'];
        } else {
            res.status(400).json({ msg: 'Invalid new password' })
        }
    } else {
        res.status(400).json({ msg: 'You didn´t write the same password' })
    }
}

const recoverPassword = async(req, res) => {
    try {
        const recoverToken = jwt.sign({email: req.params.email}, jwt_key, {expiresIn: '20m'});
        const url = `${urlRecoverPassword}/restorepassword/:email` + recoverToken;
        await transporter.sendMail({
            to: req.params.email,
            subject: 'Recover Password',
            html: `<h3>Recover Password</h3>
                <a href = ${url}>Click to recover password</a>
                <p>Link will expire in 20 minutes</p>`
        });
        res.status(200).json({
            message: 'A recovery email has been sent to your mail direction'
        })
    } catch (error) {
        console.log('Error:', error)
    }
};

module.exports = {
    renderBrowser,
    renderMovieDetails,
    renderUserFavs,
    addFav,
    deleteFav,
    renderRestorePassword,
    changePassword,
    recoverPassword,
}