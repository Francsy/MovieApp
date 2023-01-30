const renderAdminBrowser = async (req, res, next) => {
    res.status(200).render('adminBrowser')
}

const getAdminMovie = async (req, res, next) => {
}

const getAdminCreate = (req, res) => {
    res.status(200).render('adminCreate')
}

const getAdminEdit = async (req, res, next) => {
    res.status(200).render('adminEdit')
}

module.exports = {
    renderAdminBrowser,
    getAdminMovie,
    getAdminCreate,
    getAdminEdit,
}