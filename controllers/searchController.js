const axios = require('axios');
const sharp = require('sharp');

const renderBrowser = async (req, res, next) => {
    if (!req.query.searchEx) {
        res.status(200).render('browser')
    }
    else {
        const { searchEx } = req.query;
        let filmsRes = await fetch(`https://imdb-api.com/en/API/SearchMovie/${process.env.IMDB_KEY}/${searchEx}`);
        const filmsFounds = await filmsRes.json();
        let filmsFoundsArr = filmsFounds.results
        filmsFoundsArr = filmsFoundsArr.filter(film => film.image != '') // filter films with no image
        filmsFoundsArr = filmsFoundsArr.map(movie => axios.get(movie.image, { responseType: 'arraybuffer' })
        .then(response => {
            return sharp(response.data)
                .resize({ width: 300 })
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toBuffer();
        })
        .then(data => {
            movie.image = data;
        }))
        filmsFoundsArr = filmsFoundsArr.slice(0, 10); // 10 results limit
        res.status(200).render('browser', { "movies": filmsFoundsArr, "search": searchEx })
    }
}

const getMovieDetails = async (req, res, next) => {
    const { title } = req.params
    const movieRes = await fetch(`https://imdb-api.com/en/API/Title/${process.env.IMDB_KEY}/${title}`);
    const movie = await movieRes.json();
    axios.get(movie.image, { responseType: 'arraybuffer' })
        .then(response => {
            return sharp(response.data)
                .resize({ width: 300 })
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toBuffer();
        })
        .then(data => {
            movie.image = data;
        })
    res.status(200).render('movie', { movie })
}

module.exports = {
    renderBrowser,
    getMovieDetails
}