const Movie = require('../models/movies');

const renderAdminPage= async (req, res, next) => {
    try {
        let movies = await Movie.find({},'-_id -__v');
        res.status(200).render('adminPage', { "adminMovies": movies });
    }
    catch(err){
        next(err)
    }
}

const getAdminCreate = (req, res) => {
    res.status(200).render('adminCreate')
}

const getAdminEdit = async (req, res, next) => {
    res.status(200).render('adminEdit')
}

module.exports = {
    renderAdminPage,
    getAdminCreate,
    getAdminEdit,

}