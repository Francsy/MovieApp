const express = require('express');
require('dotenv').config()
const fetch = require('node-fetch')

// Middlewares modules:
const morgan = require('morgan')
const errorManager = require('./middlewares/errorManager')

// Routes modules:
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const adminRouter = require('./routes/adminRoutes')

const app = express();
const PORT = 3000;

app.use(express.json())
app.use(morgan('dev'));
app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static('public'))

// Routes:
app.use('/admin',adminRouter);
app.use('/u', userRouter);
app.use('/', authRouter);

app.use(errorManager)

app.listen(PORT, () => {
    console.info(`> Traemos un montón de películas en el puerto ${PORT}!!! 🎥✨🎬`);
})