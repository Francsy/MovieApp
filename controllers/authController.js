
// Renderiza pagina inicial con formulario de autenticación: 

const renderLogin = (req, res) => {
    res.status(200).render('login')
}

// Renderiza pagina de registro de usuario:

const renderSignup = (req, res) => {
    res.status(200).render('signUp')
}

// Recibe email y contraseña para logear al usuario:

const postLogin = async (req, res) => {
    const loggedUser = req.body;
    const response = await entry.logUser(newUser);
    res.status(201).json({
        
    });
}

// Recibe email y contraseña para registrar usuario:

const postSignUp = async (req, res) => {
    const newUser = req.body;
    const response = await entry.createUser(newUser);
    res.status(201).json({
        "items_created": response,
        data: newUser
    });
}

// Renderiza pagina de recuperación de password:

const renderRecoverPassword = (req, res) => {
    res.status(200).render('recoverPassword')
}

// Envia un post para la recuperación de password
const postRecoverPassword =  (req, res) => {
    console.log('Pidiendo password')
}

// const googleLogin?
// const googleSingUp
// const logOut


module.exports = {
    renderLogin,
    renderSignup,
    postLogin,
    postSignUp,
    renderRecoverPassword,
    postRecoverPassword
    // googleLogin?
    // googleSingUp
    // logOut
}