var db = require('../lib/mongoose');

exports.create = function(req, res) {
    var totalCount = 0;

    var data = new db.subscribeModel({
        eventId: req.body.eventId,
        userId: req.body.userId,
    });

    var querySubscribe = db.subscribeModel.findOne({
        'eventId': req.body.eventId,
        'userId': req.body.userId
    });

    var queryEvent = db.eventModel.findOne({
        '_id': req.body.eventId
    });

    queryEvent.exec(function(err, queryRes) {
        if(err) return handleError(err);
        totalCount = queryRes.currentCount;
    });

    querySubscribe.exec(function(err, queryRes) {
        if (err) return handleError(err);
        if (!queryRes) {
            data.save(function(err) {
                if (!err) {
                    queryEvent.update({currentCount: ++totalCount}, function(err) {
                        if(err) {return handleError(err)}
                    });
                    res.send(201);
                    res.end();
                } else {
                    res.send(500);
                    res.end();
                }
            });
        } else {
            res.send(409);
        }
    });
};