var db = require('../lib/mongoose');


exports.create = function (req, res) {
/*
	var data = new db.userModel({
		id: req.body.user._id,
		name: req.body.name,
        surname: req.body.sourname,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
        confirmed: req.body.confirmed
	});

	console.log(data);

	data.save(function (err) {
        if (!err) {
            res.send({
            	//action: "saved"
            });
            res.end;
        } else {

            res.send({
            //	action: "failSave"
            });
            console.log(err);
            res.end;
        }
    });
*/
};

exports.getAll = function (req, res) {
/*	var query = db.userModel.find({role: { $eq: 'teacher'}});
    query.select('name surname email phone');
    query.exec(function (err, queryRes) {
        if (err) {
            return handleError(err)
        } else {
            res.send(JSON.stringify(queryRes));
            res.end;
        }
    });
    */


};


exports.getNotApproved = function (req, res) {
    /*
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
*/
};

