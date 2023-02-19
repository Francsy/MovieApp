const express = require('express');
const session = require('express-session');
require('dotenv').config();
const path = require('path');
const cookieParser = require("cookie-parser");
const { adminProtector, userProtector } = require('./middlewares/verifiedToken');
const passport = require("passport");
const helmet = require('helmet')

// Middlewares modules:
const morgan = require('morgan');
const errorManager = require('./middlewares/errorManager');

// Routes modules:
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const googleRouter = require('./routes/googleRoutes');

const app = express();
const PORT = 3000;

// Initialize passport and passport's session
app.use(session({
    secret: process.env.SESS_KEY,
    resave: false,
    saveUninitialized: true,
}));


app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        "img-src": ["'self'", "https: data:"]
      },
      crossOriginEmbedderPolicy: false,
    })
  )
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session())
app.use(morgan('dev'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


// Routes:
app.use('/admin', adminProtector, adminRouter);
app.use('/u', userProtector, userRouter);
app.use('/google', googleRouter)
app.use('/', authRouter);

app.use(errorManager)

app.listen(PORT, () => {
    console.info(`> Traemos un montón de películas en el puerto ${PORT}!!! 🎥✨🎬`);
})