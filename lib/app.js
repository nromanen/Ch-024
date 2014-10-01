var express = require('express'),
    routes = require('./../routes/index'),
    http = require('http'),
    path = require('path'),
    app = express(),
    config = require('./configuration/config.js'),
    log = require('./log.js')(module),
    user = require('./../functions/user.js');
    subject = require('./../functions/subject.js'),
    teachers = require('./../functions/teachers.js'),
    category = require('./../functions/category.js'),
    events = require('./../functions/events.js'),
    cryptor = require('cryptor');


app.set('port', process.env.PORT || config.get('port'));

/*
 * Express@3 USE's section
 *
 * */
/*SESSION initialize*/
app.use(express.cookieParser('S3CRE7'));
app.use(express.cookieSession());

//BodyParser - parse client requests
app.use(express.bodyParser());
// favicon =)
app.use(express.favicon());
//Enable logger (Express native), this module logged many [not] interest info
app.use(express.logger('dev'));
// Enable express router, module help us to route queries
app.use(app.router);
//Static path (defoult page)
app.use(express.static(path.join(__dirname, '../public')));
/*Uses cookies */

// response to home root get req
app.get('/', routes.index);

// app.get('/calendar', routes.app);
//login api
app.post('/signin', user.logIn);
app.post('/signup', user.signUp);
app.post('/logout', user.logOut);

//subjects api
app.post('/subject', subject.create);
app.get('/subject/:cat', subject.get);
app.get('/subject', subject.get);

//categories api
app.get('/category',category.get);
app.post('/category',category.create);

// teachers api
app.get('/teachers/notapproved',teachers.getNotApproved);
app.get('/teachers',teachers.getAll);
app.post('/teachers',teachers.create);

//events api
app.get('/events', events.getAll);
app.post('/events',events.create);



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

app.get('/ErrorExample', function (req, res, next) {
    next(new Error('Internal error!'));
});

module.exports = app;