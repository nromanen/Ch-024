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

    var query = db.categoryModel.find({_id:req.body._id});
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