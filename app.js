var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    app = express(),
    config = require('./lib/config.js'),
    log = require('./lib/log.js')(module),
    user = require('./functions/user.js');
    subject = require('./functions/subject.js'),
    category = require('./functions/category.js'),
    cryptor = require('cryptor');


app.set('port', process.env.PORT || 3000);

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
app.use(express.static(path.join(__dirname, 'public')));
/*Uses cookies */

// response to home root get req
app.get('/', routes.index);

// app.get('/calendar', routes.app);
//login api
app.post('/signin', user.logIn);
app.post('/signup', user.signUp);
app.post('/logout', user.logOut);

//subjects api
app.post('/subject/:cat', subject.create);
app.get('/subject/:cat', subject.get);
app.get('/subject', subject.get);

//categories api
app.get('/category',category.get);
app.post('/category',category.create);








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

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});