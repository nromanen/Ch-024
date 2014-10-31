var db = require('../lib/mongoose');

exports.create = function(req, res) {

    var currentCountOfSubscribe = 0,
        amountOfStudents = 0;


    var updateQueryEvent = function(err) {
        if (!err) {
            if (currentCountOfSubscribe <= amountOfStudents) {

                queryEvent.update({
                    currentCount: currentCountOfSubscribe
                }, function(err) {
                    if (err) return handleError(err);
                });

                data.save();

                res.send(201);
            } else {
                res.send(507);
            }
        } else {
            res.send(500);
        }
    };

    var data = new db.subscribeModel({
        event: req.body.event,
        user: req.body.user
    });

    var querySubscribe = db.subscribeModel.findOne({
        'event._id': req.body.event._id,
        'user._id': req.body.user._id
    });

    var queryEvent = db.eventModel.findOne({
        _id: req.body.event._id
    });

    queryEvent.exec(function(err, queryResEvent) {
        if (err) return handleError(err);
        currentCountOfSubscribe = queryResEvent.currentCount;
        amountOfStudents = queryResEvent.amountOfStudents;
        ++currentCountOfSubscribe;
    });

    querySubscribe.exec(function(err, queryResSubscribe) {
        if (err) return handleError(err);
        if (!queryResSubscribe) {
            updateQueryEvent();
        } else {
            res.send(409);
        }
    });
};

exports.getAll = function(req, res) {
    var querySubscribe = db.subscribeModel.find({});

    querySubscribe.exec(function(err, queryRes) {
        if (err) {
            return handleError(err);
        } else {
            res.send(queryRes);
        }
    });

};
