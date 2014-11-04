var db = require('../lib/mongoose'),
    async = require('async'),
    _ = require('underscore');

exports.create = function (req, res) {
    var data = new db.categoryModel({
        title: req.body.title,
        authorId: req.body.authorId
    });

    data.save(function (err) {
        if (!err) {
            res.end;
        } else {
            res.end(err.message);
        }
    });
};

exports.confirm = function(req, res) {
    var query = db.categoryModel.find({'_id': req.params.id});
    query.update({approved: true}, function(err) {
        if(err) {
            return handleError(err);
        } else {
            res.send("Confirm Category ID: " + req.params.id);
        }
    });
};

exports.delete = function(req, res) {
    var queryCategory = db.categoryModel.find({'_id': req.params.id});
    var querySubject = db.subjectModel.find({'categoryId': req.params.id});
    queryCategory.remove(function(err) {
        if(err) {
            return handleError(err);
        } else {
            querySubject.remove(function(err) {
                if(err) return handleError(err);
            });
            res.send("Delete Category ID: " + req.params.id);
        }
    });
};

exports.get = function (req, res) {
    var query = db.categoryModel.find({approved: true});
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

exports.getNotApproved = function (req, res) {
    var categoryQuery = db.categoryModel.find({approved: false});
    categoryQuery.select('title authorId');
    categoryQuery.exec(function (err, queryRes) {
        if (err) {
            return handleError(err)
        } else {
            res.json(queryRes);
        }
    });
    // var usersQuery = db.userModel.find({$or:[{role: 'teacher'}, {role: 'admin'}]})
    // async.parallel({
    //     categories: function(callback) {
    //            categoryQuery.exec(function (err, queryRes) {
    //             if (err) {
    //                 return handleError(err)
    //             } else {
    //                 callback(null, queryRes);
    //             }
    //         });
    //     },

    //     users: function(callback){
    //         usersQuery.exec(function (err, queryRes) {
    //             if (err) {
    //                 return handleError(err)
    //             } else {
    //                 callback(null, queryRes);
    //             }
    //         });
    //     }
    // },

    // function (err, result) {
    //         if (err) return handleError(err);
    //         var data = [];

    //         for(var elements in result.categories) {
    //             var authorInfo = {
    //                 //name: result.users[elements.authorId],
    //                 name: result.users.find(result.categories.authorId),
                    
    //             };
    //             data.push(authorInfo);
    //         }
    //         res.send(categories);
    //         // console.log(result.categories);
    //         // console.log(result.users);
    // });
};