const Movie = require('../models/movieMongo');

// Render the admin view with all the movies, with a create button, edit button for each movie by mongo id and remove button
const renderAdminPage = async (req, res, next) => {
    try {
        let movies = await Movie.find({}, '-_id -__v');
        res.status(200).render('adminPage', { "adminMovies": movies });
    }
    catch (err) {
        next(err)
    }
}

// Render the create movie view with a form for posting to mongo (a public id must be added automatically)
const renderAdminCreate = (req, res) => {
    res.status(200).render('adminCreate')
}

// Render the edit movie view
const renderAdminEdit = async (req, res, next) => {
    const movie = await Movie.findOne({ movieId: req.params.movieId });
    res.status(200).render('adminEdit', { movie })
}

// Post from create form. It sends all the data by req.body
const createMovie = async (req, res) => {
    const newMovie = await req.body;
    try {
        let response = await new Movie(newMovie);
        let answer = await response.save();
        console.log(answer)

        res.status(200).redirect("/admin")
    } catch (err) {
        res.status(400).json({
            msj: err.message
        });
    }
}

// Send a put for editing movie
const editMovie = async (req, res) => {
    try {
        await Movie.findOneAndUpdate({ movieId: req.body.movieId }, {
            Title: req.body.Title,
            Year: req.body.Year,
            Runtime: req.body.Runtime,
            Genre: req.body.Genre,
            Director: req.body.Director,
            Writer: req.body.Writer,
            Actors: req.body.Actors,
            Plot: req.body.Plot,
            Poster: req.body.Poster,
            imdbRating: req.body.imdbRating
        }, { new: true });

        res.status(200).redirect('/admin');
    } catch (err) {
        res.status(400).json({
            msj: err.message
        });
    }
}

// Send a delete for removing movie
const deleteMovie = async (req, res) => {
    try {
        await Movie.findOneAndDelete({ movieId: req.params.movieId });
        res.status(200).redirect('/admin');
    } catch (err) {
        res.status(400).json({
            msj: err.message
        });
    }
}

module.exports = {
    renderAdminPage,
    renderAdminCreate,
    renderAdminEdit,
    createMovie,
    editMovie,
    deleteMovie
}