var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    ConnectRoles = require('connect-roles'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    flash = require('connect-flash'),
    app = express(),
    config = require('./lib/config.js'),
    log = require('./lib/log.js')(module),
    db = require('./lib/mongoose'),
    userRoles = require('./lib/authorization').Auth(),
    Urls = require('./urls').Urls;
/*
 * Express@3 USE's section
 *
 * */
/*SESSION initialize*/
app.configure(function() {
    app.use(express.cookieParser('S3CRE7'));
    app.use(express.cookieSession());
    app.set('view engine', 'ejs');
//BodyParser - parse client requests
    app.use(express.bodyParser());
// favicon =)
    app.use(express.favicon());
//Enable logger (Express native), this module logged many [not] interest info
    app.use(express.logger('dev'));
    app.use(express.session({ secret: 'keyboard cat' }));
//init passport
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(userRoles.middleware());
// Enable express router, module help us to route queries
    app.use(app.router);
//Static path (defoult page)
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(function (req, res, next) {
        res.status(404);
        log.error('Not found URL: %s', req.url);
        res.send({ error: 'Not found' });
        return;
    });

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        log.error('Internal error(%d): %s', res.statusCode, err.message);
        res.send({ error: err.message });
        return;
    });

    app.use(function (req, res, next) {
        res.status(404);
        log.error('Not found URL: %s', req.url);
        res.send({ error: 'Not found' });
        return;
    });
});

Urls(app, userRoles);

app.set('port', process.env.PORT || config.get('port'));

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
