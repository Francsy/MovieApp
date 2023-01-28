const express = require('express')

//Middlewares modules:
const morgan = require('morgan')

const app = express();
const PORT = 3000;

app.use(morgan('dev'));

app.listen(PORT, () => {
    console.info(`> Traemos un montón de películas en el puerto ${PORT}!!! 🎥✨🎬`);
})