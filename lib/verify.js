var db = require('./mongoose.js');

exports.verify = function (mail, hash) {

    var query = db.userModel.findOne({ 'email': req.body.email });
    query.select('password');
    query.exec(function (err, pass) {
        if (err) return handleError(err);
        goNext(pass.password);
    });

    function goNext(pass) {
        if (hash == pass) {

         //   req.session.mail = req.body.email;
            console.log('good login');
        } else {
            //incorect login/pass
            res.send('password is incorrect');
            console.log(2);
            console.log(pass);
        }
        res.end('response');
    }

};