const express = require('express');
const googleRouter = express.Router();
const googleController = require('../controllers/googleController');

//Ruta que renderiza el prompt de Google con las cuentas
googleRouter.get("/auth", googleController.googlePrompt);

//Esta ruta tiene dos funciones, la primera es en caso de fallo nos redirecciona a /auth/failure, y la segunda, en caso de éxito realiza la función siguiente.
googleRouter.get("/callBack", googleController.authFailOrSuccess);

//Definimos una ruta en caso de que la autenticación falle.
googleRouter.get('/auth/failure', googleController.googleAuthFail);

//Definimos la ruta de logout, donde eliminamos la sesión y limpiamos el token de las cookies.
// googleRouter.get('/logout', googleController.googleLogOut);

module.exports = googleRouter