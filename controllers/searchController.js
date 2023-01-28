const renderBrowser = (req, res, next) => {
    res.render('browser')
    if(req.body.title){
        const { title } = req.body;
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