const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const verifiedToken = require('../middlewares/verifiedToken').userProtector;

// Renderiza buscador sin peliculas y con peliculas de la api y de mongo
userRouter.get('/search', userController.renderBrowser);

// Renderiza pagina detallada de la pelicula, con botón para añadir a fav y comentarios por scraping:
// CAMBIO IMPORTANTE: El id ahora se encuentra en id de h2 del front
userRouter.get('/search/:id', userController.renderMovieDetails); 

// Renderiza pagina de favoritos del usuario, cada peli con botón para borrar favorito:
// Debe introducir en el front también el id de la peli (sea el de la api o el de mongo) para poder eliminar
// Por ahora pasamos la id de usuario por params
userRouter.get('/movies', verifiedToken, userController.renderUserFavs); //http://localhost:3000/u/movies/

// Postea una película a lista de favoritos del usuario.
// El id de la pelicula (sea de la api o de la peli en mongo debe llegar por req.body)
// Por ahora pasamos la id de usuario por params
userRouter.post('/movies', verifiedToken, userController.addFav);

userRouter.delete('/movies', verifiedToken, userController.deleteFav);

// Renderiza la pagina con el formulario para cambiar contraseña:
userRouter.get('/restorepassword', userController.renderRestorePassword);

// Recibe contraseña actual y la nueva repetida dos veces para validar:
userRouter.post('/restorepassword', userController.changePassword);

module.exports = userRouter;