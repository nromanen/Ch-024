/**
 * Created by akomatc on 9/16/2014.
 */
var db = require('../lib/mongoose');

var getSubjects = function () {

};

exports.create = function (req, res) {
    var data = new db.subjectModel({
        title: req.body.title,
        color: req.body.color,
        categoryId: req.body.category._id
    });

    console.log(data);

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


    /*    var query = db.categoryModel.find({_id: req.body.category._id});
     query.select('title');
     query.exec(function (err, queryRes) {
     if (err) {
     return handleError(err)
     } else {

     var data = new db.subjectModel({
     title: req.body.title,
     color: req.body.color,
     catId: queryRes
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
     })
     }*/
};


exports.get = function (req, res) {

    var query = db.subjectModel.find({});
    query.select('title categoryId color textColor');
    query.exec(function (err, queryRes) {
        if (err) {
            return handleError(err)
        } else {
            res.send(JSON.stringify(queryRes));
            res.end;
        }
    });


};