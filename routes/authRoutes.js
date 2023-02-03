const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');

// Renderiza pagina inicial con formulario de autenticación: 
authRouter.get('/', authController.renderLogin); 

// Renderiza pagina de registro de usuario:
authRouter.get('/signup', authController.renderSignup);

// Recibe email y contraseña para logear al usuario:
authRouter.post('/login', authController.postLogin);

// Recibe email y contraseña para registrar usuario:
authRouter.post('/signup', authController.postSignup);

// Renderiza pagina de recuperación de password:
authRouter.get('/recoverpassword', authController.renderRecoverPassword);

// Envia un post para la recuperación de password
authRouter.post('/recoverpassword', authController.postRecoverPassword)

// authRouter.post('/googlelogin, authController.googleLogin) ???

// authRouter.post('/googlesignup, authController.googleSignup) ??



module.exports = authRouter;