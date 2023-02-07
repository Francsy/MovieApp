const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const { logOutProtector } = require('../middlewares/verifiedToken')

// Renderiza pagina inicial con formulario de autenticación: 
authRouter.get('/', authController.renderLogin); 

// Renderiza pagina de registro de usuario:
authRouter.get('/signup', authController.renderSignup);

// Recibe email y contraseña para logear al usuario:
authRouter.post('/login', authController.postLogin);

// Recibe email y contraseña para registrar usuario:
authRouter.post('/signup', authController.postSignUp);

authRouter.get('/logout', logOutProtector, authController.logOut)

// Renderiza pagina de recuperación de password:
authRouter.get('/recoverpassword/:email', authController.renderRecoverPassword);
// Envía un POST para recuperación de password:
authRouter.post('/recoverpassword/:email', authController.recoverPassword);

// Renderiza pagina de recuperación de password:
authRouter.get('/resetpassword/:recoverToken', authController.renderResetPassword);
// PUT para Reset del Password
authRouter.put('/resetpassword/:recoverToken', authController.resetPassword);

// authRouter.post('/googlelogin, authController.googleLogin) ???

// authRouter.post('/googlesignup, authController.googleSignUp) ??

// authRouter.get('/logout', authController.logOut) ????


module.exports = authRouter;