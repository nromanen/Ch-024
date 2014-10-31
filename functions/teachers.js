var db = require('../lib/mongoose'),
    async = require('async'),
    _ = require('underscore');

exports.get = function (req, res) {
    var eventQuery = db.eventModel.find({});
    var subscribeQuery = db.subscribeModel.find({});
    var titleQuery = db.eventModel.find({});
    eventQuery.select('start end classroom amountOfStudents currentCount');
    subscribeQuery.select('user.username user.surname');
    titleQuery.select('title');

    async.parallel({
            title: function (callback) {
                titleQuery.exec(function (err, queryRes) {
                    if (err) {
                        return handleError(err);
                    } else {
                        callback(null, queryRes);
                    }
                });
            },
            events: function (callback) {
                eventQuery.exec(function (err, queryRes) {
                    if (err) {
                        return handleError(err);
                    } else {
                        callback(null, queryRes);
                    }
                });
            },
            students: function (callback) {
                subscribeQuery.exec(function (err, queryRes) {
                    if (err) {
                        return handleError(err);
                    } else {
                        callback(null, queryRes);
                    }
                });
            }
        },
        function (err, result) {
            var data = [];
            for(var elements in result.title) {
                var tmp = {
                    title: result.title[elements].title,
                    event: result.events[elements],
                    students: result.students[elements]
                };
                data.push(tmp);
            }
            res.send(data);
        });
};