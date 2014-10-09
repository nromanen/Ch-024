var user = require('./functions/user.js'),
    routes = require('./routes'),
    subject = require('./functions/subject.js'),
    category = require('./functions/category.js'),
    events = require('./functions/events.js'),
    passport = require('passport');

function Urls(app, userRoles){
    // response to home root get req
    app.get('/', routes.index);

    // app.get('/calendar', routes.app);
    //login api
    app.post('/signin', passport.authenticate('local'), user.logIn);
    app.post('/signup', user.signUp);
    app.get('/logout', userRoles.can('user'), user.logOut);

    //subjects api
    app.post('/subject', userRoles.can('teacher'), subject.create);
    app.get('/subject/:cat', userRoles.can('teacher'), subject.get);
    app.get('/subject', userRoles.can('teacher'), subject.get);

    //categories api
    app.get('/category', userRoles.can('teacher'), category.get);
    app.post('/category', userRoles.can('teacher'), category.create);

    //events api
    app.get('/events', userRoles.can('user'), events.getAll);
    app.post('/events', userRoles.can('teacher'), events.create);
}

exports.Urls = Urls;