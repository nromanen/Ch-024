var db = require('../lib/mongoose'),
    crypto = require('crypto'),
    nodemailer = require('nodemailer');

exports.logOut = function (req, res) {
    req.session = null;
    res.send(JSON.stringify({action: 'logout'}));
    res.end;
};

exports.logIn = function (req, res) {

    var query = db.userModel.findOne({ 'email': req.body.email });
    query.select('password username email role');
    query.exec(function (err, qRes) {
        if (err) return handleError(err);

        goNext(qRes.password, qRes.username, qRes.role);
    });


    function goNext(pass, username, role) {
        if (req.body.hash == pass) {

            req.session.email = req.body.email;
            req.session.username = username;
            req.session.role = role;
            //  res.cookie('login', 'true', { maxAge: 900000 });
            var data = {
                action: 'logined',
                role: role,
                email: req.body.email,
                username: username
            };

            res.send(JSON.stringify(data));
            console.log(req.session);
            res.end;

        } else {
            //incorect login/pass
            res.send(JSON.stringify({action: 'incorrect'}));

        }
        res.end;
    }

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
        password: req.body.password
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

exports.sendMail = function (req, res) {


// create reusable transporter object using SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'ticapac@gmail.com',
            pass: 'charming273008'
        }
    });
    var mailData= {
        to: 'ticapac@gmail.com',
        subject: 'Great victory',
        plainText: 'any plain text',
        htmlBody: 'ANY HTML'


    };
// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'Fred Foo ✔ <ticapac@gmail.com>', // sender address
        to: mailData.to, // list of receivers
        subject: mailData.subject, // Subject line
        text: mailData.plainText, // plaintext body
        html: mailData.htmlBody // html body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
};
