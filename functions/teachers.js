var db = require('../lib/mongoose');

exports.getNotApproved = function (req, res) {

	var query = db.userModel.find({role: { $eq: 'teacher'}, confirmed: { $eq: false }});
    query.select('name surname email phone');
    query.exec(function (err, queryRes) {
        if (err) {
            return handleError(err)
        } else {
            res.send(JSON.stringify(queryRes));
            res.end;
        }
    });

};

