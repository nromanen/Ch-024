var user = require('./functions/user.js'),
    routes = require('./routes'),
    subject = require('./functions/subject.js'),
    category = require('./functions/category.js'),
    events = require('./functions/events.js'),
    teachers = require('./functions/teachers.js'),
    subscribe = require('./functions/subscribe.js'),
    passport = require('passport');

function Urls(app, userRoles){
    // response to home root get req
    app.get('/', routes.index);

    // app.get('/calendar', routes.app);
    //login api
    app.post('/login', passport.authenticate('local'), user.logIn);
    app.post('/signup', user.signUp);
    app.post('/logout', userRoles.can('user'), user.logOut);
    app.get('/user/:id', userRoles.can('user'), user.getById);
    app.get('/users/notapproved',userRoles.can('admin'), user.getNotApproved);
    app.put('/user/:id', userRoles.can('admin'), user.confirm);


    //subjects api
    app.post('/subject', userRoles.can('teacher'), subject.create);
    //app.get('/subject/:cat', userRoles.can('user'), subject.get);
    app.get('/subject', userRoles.can('teacher'), subject.get);
    app.get('/subjects/notapproved', userRoles.can('admin'), subject.getNotApproved);
    app.del('/subject/:id', userRoles.can('admin'), subject.delete);
    app.put('/subject/:id', userRoles.can('admin'), subject.confirm);

    //categories api
    app.get('/category', userRoles.can('teacher'), category.get);
    app.post('/category', userRoles.can('teacher'), category.create);
    app.get('/categories/notapproved',userRoles.can('admin'), category.getNotApproved);
    app.del('/category/:id', userRoles.can('admin'), category.delete);
    app.put('/category/:id', userRoles.can('admin'), category.confirm);

    //events api
    app.get('/events', userRoles.can('user'), events.getAll);
    app.post('/events', userRoles.can('teacher'), events.create);
    app.del('/events/:id', userRoles.can('admin'), events.delete);
    app.get('/event/:id', userRoles.can('user'), events.getOne);

    //subscribe api
    app.post('/subscribe', userRoles.can('user'), subscribe.create);
    app.get('/subscribe', userRoles.can('user'), subscribe.getAll);
}

exports.Urls = Urls;