const renderLogin = (req, res) => {
    res.status(200).render('log')
}

const renderSignup = (req, res) => {
    res.status(200).render('sign')
}

const renderRecoverPassword = (req, res) => {
    res.status(200).render('recoverpassword')
}

const renderRestorePassword = (req, res) => {
    res.status(200).render('restorepassword')
}

const postLogin = async (req, res) => {
    const loggedUser = req.body;
    const response = await entry.logUser(newUser);
    res.status(201).json({
        
    });
}

const postSignup = async (req, res) => {
    const newUser = req.body;
    const response = await entry.createUser(newUser);
    res.status(201).json({
        "items_created": response,
        data: newUser
    });
}

module.exports = {
    renderLogin,
    renderSignup,
    renderRecoverPassword,
    renderRestorePassword,
    postLogin,
    postSignup
}