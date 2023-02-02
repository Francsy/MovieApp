const express = require('express');
require('dotenv').config()
const fetch = require('node-fetch')

// Middlewares modules:
const morgan = require('morgan')
const errorManager = require('./middlewares/errorManager')
const bodyParser = require('body-parser');

// Routes modules:
const logSignRouter = require('./routes/logSignRoutes')
const searchRouter = require('./routes/searchRoutes')
const adminRouter = require('./routes/adminRoutes')

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes:
app.use('/',logSignRouter);
app.use('/search',searchRouter);
app.use('/admin',adminRouter);

app.use(errorManager)

app.use(express.static('public'))

app.listen(PORT, () => {
    console.info(`> Traemos un montón de películas en el puerto ${PORT}!!! 🎥✨🎬`);
})