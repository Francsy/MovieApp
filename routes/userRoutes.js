const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

// Renderiza buscador sin peliculas y con peliculas de la api y de mongo:
// CAMBIO IMPORTANTE: Debe tener el id para abrir detalles de la pelicula
userRouter.get('/search', userController.renderBrowser);

// Renderiza pagina detallada de la pelicula, con botón para añadir a fav y comentarios por scraping:
// CAMBIO IMPORTANTE: Cambiarr para que el id este en el front y al clicar se saque los detalles por id
userRouter.get('/search/:title', userController.renderMovieDetails);

// Renderiza pagina de favoritos del usuario, cada peli con botón para borrar favorito:
// Debe introducir en el front también el id de la peli (sea el de la api o el de mongo) para poder eliminar
// Por ahora pasamos la id de usuario por params
userRouter.get('/movies/:userid', userController.renderUserFavs); //http://localhost:3000/u/movies/22

// Postea una película a lista de favoritos del usuario.
// El id de la pelicula (sea de la api o de la peli en mongo debe llegar por req.body)
// Por ahora pasamos la id de usuario por params
userRouter.post('/movies/:userid', userController.addFav);

// Renderiza la pagina con el formulario para cambiar contraseña:
userRouter.get('/restorepassword', userController.renderRestorePassword);

// Recibe contraseña actual y la nueva repetida dos veces para validar:
userRouter.post('/restorepassword', userController.changePassword);

module.exports = userRouter;