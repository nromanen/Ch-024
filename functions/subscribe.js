var db = require('../lib/mongoose');

exports.create = function(req, res) {
    var data = new db.subscribeModel({
        eventId: req.body.eventId,
        userId: req.body.userId,
    });

    var query = db.subscribeModel.findOne({
        'eventId': req.body.eventId,
        'userId': req.body.userId
    });

    query.exec(function(err, queryRes) {
        if (err) {
            return handleError(err)
        }
        if (!queryRes) {
            data.save(function(err) {
                if (!err) {
                    res.send(201);
                    res.end();
                } else {
                    res.send(500);
                    console.log(err);
                    res.end();
                }
            });
        } else {
            res.send(409);
        }
    });
};
