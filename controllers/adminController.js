const Movie = require('../models/movies');
const { renderBrowser } = require('./searchController');

const renderAdminPage = async (req, res, next) => {
    try {
        let movies = await Movie.find({}, '-_id -__v');
        res.status(200).render('adminPage', { "adminMovies": movies });
    }
    catch (err) {
        next(err)
    }
}

const getAdminCreate = (req, res) => {
    res.status(200).render('adminCreate')
}

const getAdminEdit = async (req, res, next) => {
    const movie = await Movie.findOne({ title: req.params.Title });
    res.status(200).render('adminEdit', { movie })
}

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

const editMovie = async (req, res) => {
    try {
        await Movie.findOneAndUpdate({ Title: req.body.Title }, {
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

const deleteMovie = async (req, res) => {
    try {
        await Movie.findOneAndDelete({ Title: req.params.Title });

        res.status(200).redirect('/admin');
    } catch (err) {
        res.status(400).json({
            msj: err.message
        });
    }
}

module.exports = {
    renderAdminPage,
    getAdminCreate,
    getAdminEdit,
    createMovie,
    editMovie,
    deleteMovie
}