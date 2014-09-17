/**
 * Created by akomatc on 9/16/2014.
 */
var db = require('../lib/mongoose');

var getSubjects = function (){

};

exports.create = function (req, res) {

    var data = new db.subjectModel({
        title: req.body.title,
        color: req.body.color,
        catId: req.params.cat
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
    if (req.params.cat != undefined ) {
        // get subject by ID
        res.end(req.params.cat);


    } else {

    }

    console.log(req.params.cat);



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