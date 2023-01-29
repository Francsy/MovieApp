const renderBrowser = (req, res, next) => {
    res.render('browser')
    if(req.query.title){
        const { title } = req.query;
        console.log(`Title: ${title}`);
    }
}

const getFilmDetails = (req, res, next) => {
    console.log('Funciono 2')
    
    // Sacar datos de nuestra DDBB
}

module.exports = {
    renderBrowser,
    getFilmDetails
}