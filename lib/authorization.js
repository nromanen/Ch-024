var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    ConnectRoles = require('connect-roles'),
    user = require('../functions/user.js'),
    cryptor = require('cryptor'),
    db = require('../lib/mongoose');

function Auth(){
    // Passport session setup.
    //   To support persistent login sessions, Passport needs to be able to
    //   serialize users into and deserialize users out of the session.  Typically,
    //   this will be as simple as storing the user ID when serializing, and finding
    //   the user by ID when deserializing.
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        db.userModel.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy(
        {
            usernameField: 'email'
        },
        function(username, password, done) {
            // Find the user by username.  If there is no user with the given
            // username, or the password is not correct, set the user to `false` to
            // indicate failure and set a flash message.  Otherwise, return the
            // authenticated `user`.
            db.userModel.findOne({email: username}, function(err, user) {
                if (err) return done(err);
                if (!user) {
                    return done(null, false, { message: 'Unknown user ' + username });
                }
                if (user.password != cryptor.md5(password)) {
                    return done(null, false, { message: 'Invalid password' });
                }
                return done(null, user);
            })
        }
    ));

    var userRoles = new ConnectRoles({
        failureHandler: function (req, res, action) {
            // optional function to customise code that runs when
            // user fails authorisation
            var accept = req.headers.accept || '';
            res.status(403);
            res.send('Access Denied - You don\'t have permission to: ' + action);
        }
    });

    //anonymous users can only access the home page
    //returning false stops any more rules from being
    //considered
    userRoles.use('user', function (req, action) {
        if (req.isAuthenticated()) {
            return true;
        }
    });

    //moderator users can access private page, but
    //they might not be the only ones so we don't return
    //false if the user isn't a moderator
    userRoles.use('teacher', function (req) {
        if (req.user.role === 'teacher' || req.user.role === 'admin') {
            return true;
        }
    });

    //admin users can access all pages
    userRoles.use('admin', function (req) {
        if (req.user.role === 'admin') {
            return true;
        }
    });
    return userRoles;
}

exports.Auth = Auth;