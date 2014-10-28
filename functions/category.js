var db = require('../lib/mongoose');

exports.create = function (req, res) {

    var data = new db.categoryModel({
        title: req.body.title
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
    var query = db.categoryModel.find({approved: false});
    query.select('title');
    query.exec(function (err, queryRes) {
        if (err) {
            return handleError(err)
        } else {
            res.json(queryRes);
        }
    });
};