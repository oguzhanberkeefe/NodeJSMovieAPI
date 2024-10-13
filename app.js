const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes');
const moviesRouter = require('./routes/movies');
const directorsRouter = require('./routes/directors');

const app = express();

// db connection
const db = require('./helpers/db')();

// Config
const config = require('./config');
app.set('api_secret_key', config.api_secret_key);

// Middlewares
const verifyToken = require('./middlewares/Authorization');
const errorHandling = require('./middlewares/ErrorHandling');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Encode edilmiş urller üzerinde kullanmak için extendedı true yap
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', verifyToken);
app.use('/api/movies', moviesRouter);
app.use('/api/directors', directorsRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(errorHandling);
module.exports = app;
