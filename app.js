const express = require('express');
require('dotenv').config()
const fetch = require('node-fetch')

// Middlewares modules:
const morgan = require('morgan')
const errorManager = require('./middlewares/errorManager')

// Routes modules:
const logSignRouter = require('./routes/logSignRoutes')
const searchRouter = require('./routes/searchRoutes')
const adminRouter = require('./routes/adminRoutes')

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.set('view engine', 'pug');
app.set('views','./views');

// Routes:
app.use('/',logSignRouter);
app.use('/search',searchRouter);
app.use('/adminsearch',adminRouter);

app.use(errorManager)

app.use(express.static('public'))

app.listen(PORT, () => {
    console.info(`> Traemos un montón de películas en el puerto ${PORT}!!! 🎥✨🎬`);
})