const Movie = require('../models/movies');

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
    res.status(200).render('adminEdit')
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
    const movie = await Movie.findOne({ title: req.query.Title }, (error, result) => {
        if (error) {
            console.log(error)
        }
        return result
    });
    const editedMovie = await req.body;
    try {
        let response = await new Movie(editedMovie);
        let answer = await response.save();
        console.log(answer)

        res.status(200).render("adminEdit", {movie})
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
    editMovie
}