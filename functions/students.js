var db = require('../lib/mongoose'),
    moment = require('moment');

exports.getAllNearestEvents = function(req, res) {

    var subscribeQuery = db.subscribeModel.find({
        'user._id': req.params.id
    });

    subscribeQuery.exec(function(err, queryRes) {
        if (err) {
            return handleError(err)
        } else {

            var dataAllSubscribe = [];

            for (var elements in queryRes) {
                if (moment(queryRes[elements].event.start) > moment(req.query.nowTime)) {
                    dataAllSubscribe.push(queryRes[elements]);
                }
            }
            res.json(dataAllSubscribe);
        }
    });
};

exports.getAllPastEvents = function(req, res) {

    var subscribeQuery = db.subscribeModel.find({
        'user._id': req.params.id
    });

    subscribeQuery.exec(function(err, queryRes) {
        if (err) {
            return handleError(err)
        } else {

            var dataAllSubscribe = [];

            for (var elements in queryRes) {
                if (moment(queryRes[elements].event.start) < moment(req.query.nowTime)) {
                    dataAllSubscribe.push(queryRes[elements]);
                }
            }
            res.json(dataAllSubscribe);
        }
    });
};