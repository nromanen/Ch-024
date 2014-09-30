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
        catId: req.body.category._id
    });

    data.save(function (err) {
        if (!err) {
            res.send({action: "saved"});
            res.end;
        } else {

            res.send({action: "failSave"});
            console.log(err);
            res.end;
        }
    });




};

exports.get = function (req, res) {

    var query = db.subjectModel.find({catId:req.body._id});
    query.select('title');
    query.exec(function (err, queryRes) {
        if (err) {
            return handleError(err)
        } else {
            res.send(JSON.stringify(queryRes));
            res.end;
        }
    });

};