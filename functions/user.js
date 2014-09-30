var db = require('../lib/mongoose'),
    cryptor = require('cryptor'),
    nodemailer = require('nodemailer');

exports.logOut = function (req, res) {
    req.session = null;
    res.send(JSON.stringify({action: 'logout'}));
    res.end;
};

exports.isAuth = function (req, res) {
    if (req.session.username) {
        return ({role: req.session.role, username: req.session.username});
    }
};

exports.logIn = function (req, res) {

    var logInQuery = db.userModel.findOne({ 'email': req.body.email });

    logInQuery.select('password username email role');
    logInQuery.exec(function (err, queryResult) {
        if (err) return handleError(err);

        if (queryResult) {

            if (cryptor.compare(cryptor.md5(req.body.password), queryResult.password)) {
                req.session.email = req.body.email;
                req.session.username = queryResult.username;
                req.session.role = queryResult.role;
                //  res.cookie('login', 'true', { maxAge: 900000 });
                var data = {
                    action: 'logined',
                    role: queryResult.role,
                    email: req.body.email,
                    username: queryResult.username
                };

                res.send(JSON.stringify(data));


            } else {
                //incorect login/pass
                res.send(JSON.stringify({action: 'incorrect'}));

            }
        } else {
            res.send(JSON.stringify({action: 'incorrect'}));

        }
        res.end;
    });


    // В середині модуля не бачить Монгус моделі userModel
    /*
     auth.verify(req.body.email,req.body.hash);
     */

};

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


