var db = require('../lib/mongoose');

exports.create = function (req, res) {

    var data = new db.categoryModel({
        title: req.body.title

    });

    data.save(function (err) {
        if (!err) {
            res.end;
        } else {
            res.end(err);
        }
    });


};

exports.get = function (req, res) {
    var query = db.categoryModel.find();
    query.select('title');
    query.exec(function (err, queryRes) {
        if (err) {
            return handleError(err)
        } else {
            res.send(JSON.stringify(queryRes));
            res.end;
        }



    });


    /*
     var query = db.userModel.findOne({ 'email': req.body.email });
     query.select('password username email role');
     query.exec(function (err, qRes) {
     if (err) return handleError(err);

     console.log(req.body.email);
     console.log(qRes.password);

     goNext(qRes.password, qRes.username, qRes.role);
     });*/

};