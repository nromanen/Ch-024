var db = require('../lib/mongoose');

exports.create = function(req, res) {
    var totalCount = 0;

    var data = new db.subscribeModel({
        event: req.body.event,
        user: req.body.user,
    });

    var querySubscribe = db.subscribeModel.findOne({
        'event._id': req.body.event._id,
        'user._id': req.body.user._id
    });

    var queryEvent = db.eventModel.findOne({
        '_id': req.body.event._id
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