const Movie = require('../models/movieMongo')
const favMovies = require('../models/favMoviesSQL');

// Renderiza buscador sin peliculas y con peliculas de la api y de mongo
// CAMBIO IMPORTANTE: Debe tener el id para abrir detalles de la pelicula

const renderBrowser = async (req, res, next) => {
    if (!req.query.search) {
        res.status(200).render('userBrowser')
    } else {
        try {
            const { search } = req.query;
            let movieRes = await fetch(`https://www.omdbapi.com/?s=${search}&type=movie&apikey=${process.env.OMDB_KEY}`);
            const moviesFounds = await movieRes.json();
            let moviesFoundsArr = moviesFounds.Search;
            if (moviesFoundsArr.length === 0) {
                try {
                    let dbMovies = await Movie.find({ Title: { $regex: search, $options: "i" } })
                    if (dbMovies.length > 0) {
                        res.status(200).render('userBrowser', { "movies": dbMovies, "search": search });
                    } else {
                        res.status(200).render('userBrowser', { message: "Not results available" });
                    }
                } catch (err) {
                    next(err)
                }
            } else {
                moviesFoundsArr = moviesFoundsArr.filter(film => film.Poster !== 'N/A');
                res.status(200).render('userBrowser', { "movies": moviesFoundsArr, "search": search });
            }
        } catch (err) {
            next(err)
        }
    }
}

// Renderiza pagina detallada de la pelicula, con botón para añadir a fav y comentarios por scraping:
// CAMBIO IMPORTANTE: Cambiarr para que el id este en el front y al clicar se saque los detalles por id
const renderMovieDetails = async (req, res, next) => {
    try {
        const movieRes = await fetch(`https://www.omdbapi.com/?t=${req.params.title}&plot=full&apikey=${process.env.OMDB_KEY}`);
        const movie = await movieRes.json();
        if (movie.Response === 'False') {
            const dbMovie = await Movie.findOne({ Title: req.params.title }, { "_id": 0, "__v": 0 })
            res.status(200).render('userMovie', { dbMovie });
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
    console.log(req.params.userid);
    let movies = await favMovies.getMoviesById(parseInt(req.params.userid));
    res.render('userMyMovies', { movies });
}

// Post de una película a lista de favoritos del usuario:
// El id de la pelicula (sea de la api o de la peli en mongo debe llegar por req.body):
// Por ahora pasamos la id de usuario por params:
const addFav = async (req, res) => {
    console.log(req.body.Title);
    console.log(req.params.userid);
    try {
        const title = req.body.Title;
        if (!title) {
            return res.status(400).send({ error: 'Title is required' });
        }
        const userid = req.params.userid;
        const result = await favMovies.postMovieById(title, userid);
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to add movie to favorites' });
    }
};

// Renderiza la pagina con el formulario para cambiar contraseña:
const renderRestorePassword = (req, res) => {
    res.status(200).render('userRestorePassword')
}

// Recibe contraseña actual a través de POST y la nueva repetida dos veces para validar:
const changePassword = (req, res) => {
    console.log('enviando petición de cambio de contraseña')
}

module.exports = {
    renderBrowser,
    renderMovieDetails,
    renderUserFavs,
    addFav,
    renderRestorePassword,
    changePassword
}