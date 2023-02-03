const Movie = require('../models/movieMongo');

// Renderiza pagina del admin con todas las pelis, con botón para crear, boton en cada peli para editar por id de mongo y botón borrar.
const renderAdminPage = async (req, res, next) => {
    try {
        let movies = await Movie.find({}, '-_id -__v');
        res.status(200).render('adminPage', { "adminMovies": movies });
    }
    catch (err) {
        next(err)
    }
}

// Renderiza pagina para crear nueva pelicula con formulario para introducirla en mongo (un id publico debe ser añadido automaticamente)
const renderAdminCreate = (req, res) => {
    res.status(200).render('adminCreate')
}

// Renderiza la pagina para editar pelicula
// Importante: cambbiar para que renderice por id (con el id publico en el front) => /editmovie/:id
const renderAdminEdit = async (req, res, next) => {
    const movie = await Movie.findOne({ Title: req.params.Title });
    res.status(200).render('adminEdit', { movie })
}

// Post del formulario de crear, envia todos los datos por req.body
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

// Envia un put a editar pelicula 
// IMPORTANTE: cambiar para que edite por id => /editmovie/:id
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
    renderAdminCreate,
    renderAdminEdit,
    createMovie,
    editMovie,
    deleteMovie
}