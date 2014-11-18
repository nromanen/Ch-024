/**
 * Created by akomatc on 9/16/2014.
 */
var db = require('../lib/mongoose'),
    async = require('async'),
    _ = require('underscore');

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
    var subjectsQuery = db.subjectModel.find({approved: false});
    subjectsQuery.select('title categoryId color textColor authorId');
    var categoryQuery = db.categoryModel.find({approved: true});
    categoryQuery.select('title');
    var usersQuery = db.userModel.find({
        $or:[{role: 'teacher'}, {role: 'admin'}]
    });
    usersQuery.select('username surname');
    async.parallel({
        subjects: function(callback) {
            subjectsQuery.exec(function (err, queryRes){
                if (err) {
                    return handleError(err)
                } else {
                    callback(null, queryRes);
                }
            });
        },
        categories: function(callback) {
            categoryQuery.exec(function (err, queryRes) {
                if (err) {
                    return handleError(err)
                } else {
                    callback(null, queryRes);
                }
            });
        },
        users: function(callback){
            usersQuery.exec(function (err, queryRes) {
                if (err) {
                    return handleError(err)
                } else {
                    callback(null, queryRes);
                }
            });
        },

    },

    function (err, result) {
            if (err) return handleError(err);
            var data = [];
            _.each(result.subjects, function(value, number){
                var author = _.findWhere(result.users, { id: result.subjects[number].authorId});
                var category = _.findWhere(result.categories, { id: result.subjects[number].categoryId});
                var subject = {
                    _id: result.subjects[number].id,
                    title: result.subjects[number].title,
                    color: result.subjects[number].color,
                    textColor: result.subjects[number].textColor,
                    category: category.title,
                    author: author.username+" "+author.surname
                }
                data.push(subject);
            })
            res.json(data);
    });
};