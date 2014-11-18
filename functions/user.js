var db = require('../lib/mongoose'),
    config = require('../lib/config.js'),
    cryptor = require('cryptor'),
    gravatar = require('./gravatar'),
    mailTransporter = require('./mail');


exports.logOut = function(req, res) {
    req.logout();
    res.redirect('/');
};

exports.logIn = function(req, res) {
    var userData = {
        user: req.user,
        // gravatar: gravatar.getGravatar(req.session.email),
        rights: config.get("rights")[req.user.role]
    };
    req.login(req.user, function(err) {
        if (err) {
            return next(err);
        };
    });



    res.json(userData);
};

exports.getRights = function(req, res) {
    if (req.params.sessionId === req._passport.session.user) {
        var userData = {
            user: req.user,
            // gravatar: gravatar.getGravatar(req.session.email),
            rights: config.get("rights")[req.user.role]
        };
        res.json(userData);
    } else {
        res.send(423);
    }
};

exports.getById = function(req, res) {
    var query = db.userModel.findOne({
        '_id': req.params.id
    });
    query.select('username surname phone');
    query.exec(function(err, queryRes) {
        if (err) {
            return handleError(err)
        } else {
            res.json(queryRes);
        }
    });
};

exports.signUp = function(req, res) {

    var data = new db.userModel({
        username: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phone: req.body.phone,
        password: cryptor.md5(req.body.password),
        approved: !req.body.isTeacher ? true : false
    });


    data.save(function(err) {
        if (!err) {
            mailTransporter.registeredMail({
                to: req.body.email
            });

            res.send(201);
            res.end;
        } else {

            res.send(400);
            console.log(err);
            res.end;
        }
    });

    res.end;
};

exports.getNotApproved = function(req, res) {
    var query = db.userModel.find({
        approved: false
    });
    query.select('username surname email phone');
    query.exec(function(err, queryRes) {
        if (err) {
            return handleError(err)
        } else {
            res.json(queryRes);
        }
    });
};

exports.confirm = function(req, res) {
    var query = db.userModel.find({
        '_id': req.params.id
    });
    query.update({
        approved: true,
        role: 'teacher'
    }, function(err) {
        if (err) {
            return handleError(err);
        } else {
            res.send("Confirm Subject ID: " + req.params.id);
        }
    });
};

exports.getProfile = function(req, res) {
    var query = db.userModel.findOne({
        '_id': req.user._id
    });
    query.select('username surname phone');
    query.exec(function(err, queryRes) {
        if (err) {
            return handleError(err)
        } else {
            res.json(queryRes);
        }
    });
}

exports.updatePassword = function(req, res) {
    if (cryptor.md5(req.body.currentPassword) === req.user.password) {
        var query = db.userModel.findOne({
            '_id': req.user._id
        });

        query.update({
            password: cryptor.md5(req.body.changePassword)
        }, function(err) {
            if (err) {
                return handleError(err);
            } else {
                res.send(201);
            }
        });
    } else {
        res.send(401);
    }
};

exports.updateProfile = function(req, res) {
    var query = db.userModel.findOne({
        '_id': req.user._id
    });
    console.log(req.body);
    if ((req.body.username === req.body.changeName) &&
        (req.body.surname === req.body.changeSurname) &&
        (req.body.phone === req.body.changePhone)) {
        res.send(409);
    } else {
        query.update({
            username: req.body.changeName,
            surname: req.body.changeSurname,
            phone: req.body.changePhone
        }, function(err, queryRes) {
            if (err) {
                return handleError(err)
            } else {
                res.send(201);
            }
        });
    }

};

exports.updateAvatar = function() {
    var multiparty = require('multiparty'),
        fs = require('fs');
    var form = new multiparty.Form();
    var uploadFile = {
        uploadPath: '',
        type: '',
        size: 0
    };
    var maxSize = 2 * 1024 * 1024;
    var supportMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    var errors = [];
    form.on('error', function(err) {
        if (fs.existsSync(uploadFile.path)) {
            fs.unlinkSync(uploadFile.path);
            console.log('error');
        }
    });

    form.on('close', function() {
        if (errors.length == 0) {
            res.send({
                status: 'ok',
                text: 'Success'
            });
        } else {
            if (fs.existsSync(uploadFile.path)) {
                fs.unlinkSync(uploadFile.path);
            }
            res.send({
                status: 'bad',
                errors: errors
            });
        }
    });
    form.on('part', function(part) {
        uploadFile.size = part.byteCount;
        uploadFile.type = part.headers['content-type'];
        uploadFile.path = './files/' + part.filename;
        if (uploadFile.size > maxSize) {
            errors.push('File size is ' + uploadFile.size + '. Limit is' + (maxSize / 1024 / 1024) + 'MB.');
        }
        if (supportMimeTypes.indexOf(uploadFile.type) == -1) {
            errors.push('Unsupported mimetype ' + uploadFile.type);
        }
        if (errors.length == 0) {
            var out = fs.createWriteStream(uploadFile.path);
            part.pipe(out);
        } else {
            part.resume();
        }
    });
    var path = uploadFile.path
    path[0] = '';
    var avatarLink = req.protocol + '://' + req.hostname + path;
    var user_id = req.user._id;
    var data = {
        avatarLink: avatarLink
    };
    db.userModel.findByIdAndUpdate(user_id, data);
};
