var db = require('../lib/mongoose'),
    cryptor = require('cryptor'),
    nodemailer = require('nodemailer');

exports.logOut = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.logIn = function (req, res) {
    res.redirect("/");
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
        password: cryptor.md5(req.body.password)
    });


    data.save(function (err) {
        if (!err) {
            res.send({action: "registered"});
            res.end;
        } else {

            res.send({action: "failRegister"});
            console.log(err);
            res.end;
        }
    });

    res.end;
};


