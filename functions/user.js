var db = require('../lib/mongoose'),
    config = require('../lib/config.js'),
    cryptor = require('cryptor'),
    nodemailer = require('./mail');

exports.logOut = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.logIn = function (req, res) {
    var userData = {
        username: req.user.username,
        rights: config.get("rights")[req.user.role]
    };
    res.json(userData);
};

// В середині модуля не бачить Монгус моделі userModel
/*
 auth.verify(req.body.email,req.body.hash);
 */

exports.signUp = function (req, res) {

    var data = new db.userModel({
        username: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phone: req.body.phone,
        password: cryptor.md5(req.body.password),
        approved: !req.body.isTeacher ? true : false
    });


    data.save(function (err) {
        if (!err) {
            res.send(201);
            res.end;
        } else {

            res.send({
                action: "failRegister"
            });
            console.log(err);
            res.end;
        }
    });

    res.end;
};
