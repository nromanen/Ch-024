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