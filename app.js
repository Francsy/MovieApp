const express = require("express");

// Middlewares modules:
const morgan = require('morgan')
const errorManager = require('./middlewares/errorManager')

const app = express();
const PORT = 3000;

app.use(morgan('dev'))
app.use(errorManager)

app.listen(PORT, () => {
    console.info(`> Traemos un montón de películas en el puerto ${PORT}!!! 🎥✨🎬`);
  })