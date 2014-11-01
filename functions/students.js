var db = require('../lib/mongoose');

exports.getAllSubscribe = function(req, res) {

    var subscribeQuery = db.subscribeModel.find({
        'user._id': req.params.id
    });

    console.log(req.query);

    subscribeQuery.exec(function(err, queryRes) {
        if (err) {
            return handleError(err)
        } else {
            res.json(queryRes);
        }
    });
};