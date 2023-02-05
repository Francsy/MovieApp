const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');

// Renderiza pagina del admin con todas las pelis, con botón para crear, boton en cada peli para editar por id de mongo y botón borrar.
adminRouter.get('/', adminController.renderAdminPage);

// Renderiza pagina para crear nueva pelicula con formulario para introducirla en mongo (un id publico debe ser añadido automaticamente)
adminRouter.get('/createmovie', adminController.renderAdminCreate);

// Renderiza la pagina para editar pelicula
// Importante: cambbiar para que renderice por id (con el id publico en el front) => /editmovie/:id
adminRouter.get('/editmovie/:movieId', adminController.renderAdminEdit);

// Post del formulario de crear, envia todos los datos por req.body
adminRouter.post('/createmovie', adminController.createMovie);

adminRouter.post('/editmovie/:movieId', adminController.editMovie);

// Elimina una pelicula al pulsar el botón simplemente ponieendo el id al final de la ruta
adminRouter.delete('/removeMovie/:movieId', adminController.deleteMovie)

module.exports = adminRouter;