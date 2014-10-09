var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    app = express(),
    config = require('./lib/config.js'),
    log = require('./lib/log.js')(module),
    user = require('./functions/user.js'),
    subject = require('./functions/subject.js'),
    category = require('./functions/category.js'),
    events = require('./functions/events.js'),
    cryptor = require('cryptor');


app.set('port', process.env.PORT || config.get('port'));

/*
 * Express@3 USE's section
 *
 * */
/*SESSION initialize*/
app.use(express.cookieParser('S3CRE7'));
app.use(express.cookieSession());
app.use(express.session());
//BodyParser - parse client requests
app.use(express.bodyParser());
// favicon =)
app.use(express.favicon());
//Enable logger (Express native), this module logged many [not] interest info
app.use(express.logger('dev'));
// Enable express router, module help us to route queries
app.use(app.router);
/*Uses cookies */

//Static path (defoult page)
app.use(express.static(path.join(__dirname, 'public')));

// response to home root get req
app.get('/', routes.index);

// app.get('/calendar', routes.app);
//login api
app.post('/login', user.logIn);
app.del('/logout', user.logOut);
//get session
app.get("/session", user.isAuth);
app.post('/signup', user.signUp);


//subjects api
app.post('/subject', subject.create);
//app.get('/subject/:cat', subject.get);
app.get('/subject', subject.get);
app.del('/subject/:id', subject.delete);

//categories api
app.get('/category', category.get);
app.post('/category', category.create);
app.del('/category/:id', category.delete);

//events api
app.get('/events', events.getAll);
app.post('/events', events.create);

//teachers api
//app.get('/teachers/notapproved', teachers.getNotApproved);

app.use(function(req, res, next) {
    res.status(404);
    log.error('Not found URL: %s', req.url);
    res.send({
        error: 'Not found'
    });
    return;
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    log.error('Internal error(%d): %s', res.statusCode, err.message);
    res.send({
        error: err.message
    });
    return;
});

app.get('/ErrorExample', function(req, res, next) {
    next(new Error('Internal error!'));
});

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
