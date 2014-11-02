/**
 * Created by akomatc on 9/16/2014.
 */
var db = require('../lib/mongoose');

var getSubjects = function() {

};

exports.create = function(req, res) {
    var data = new db.subjectModel({
        title: req.body.title,
        color: req.body.color,
        textColor: req.body.textColor,
        categoryId: req.body.categoryId,
        authorId: req.body.authorId
    });
    
    data.save(function(err) {
        if (!err) {
            res.send({
                action: "saved"
            });
            res.end();
        } else {

            res.send({
                action: "failSave"
            });
            console.log(err);
            res.end();
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

exports.confirm = function(req, res) {
    var query = db.subjectModel.find({'_id': req.params.id});
    query.update({approved: true}, function(err) {
        if(err) {
            return handleError(err);
        } else {
            res.send("Confirm Subject ID: " + req.params.id);
        }
    });
};

exports.delete = function(req, res) {
    var query = db.subjectModel.find({'_id': req.params.id});
    query.remove(function(err) {
        if(err) {
            return handleError(err);
        } else {
            res.send("Delete Subject ID: " + req.params.id);
        }
    });
};

exports.get = function(req, res) {

    var query = db.subjectModel.find({approved: true});
    query.select('title categoryId color textColor');
    query.exec(function(err, queryRes) {
        if (err) {
            return handleError(err)
        } else {
            res.json(queryRes);
        }
    });
};

exports.getNotApproved = function(req, res) {
    var query = db.subjectModel.find({approved: false});
    query.select('title categoryId color textColor authorId');
    query.exec(function(err, queryRes) {
        if (err) {
            return handleError(err)
        } else {
            res.json(queryRes);
        }
    });
};