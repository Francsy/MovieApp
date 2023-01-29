const renderLogin = (req, res) => {
    res.status(200).render('log')
}

const renderSignup = (req, res) => {
    res.status(200).render('sign')
}

module.exports = {
    renderLogin,
    renderSignup
}