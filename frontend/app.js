var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var welcome = require('./routes/welcome');
var catalog = require('./routes/catalog');
var passport = require('passport');
var order = require('./routes/order');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    name: 'server-session-cookie-id',
    secret: 'secrets of pets',
    saveUninitialized: true,
    resave: true,
    store: new FileStore()
}));
app.use(passport.initialize());
app.use(passport.session());
// //Just to debug. can be removed later
// app.use(function printSession(req, res, next) {
//     console.log('req.session', req.session);
//     return next();
// });
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', welcome);
app.use('/welcome', welcome);
app.use('/', catalog);
app.use('/catalog', catalog);
app.use('/', order);
app.use('/rate', order);
//app.use('/orderHis', order);
//// Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log("In catch 404 and forward to error handler.");
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log("In development error handler.");
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log("In production error handler.");
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;