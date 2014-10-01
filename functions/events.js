var db = require('../lib/mongoose');


exports.create = function (req, res) {

    var data = new db.eventModel({
        title: req.body.title,
        subjectId: req.body.subject._id,
        subject: req.body.subject,
        start: req.body.start,
        end: req.body.end,
        editable: req.body.editable,
        color: req.body.color,
        textColor: req.body.textColor,
        classroom : req.body.classroom,
        currentCount: req.body.currentCount,
        amountOfStudents: req.body.amountOfStudents
    });

    console.log(data);

    data.save(function (err) {
        if (!err) {
            res.send({action: "saved"});
            res.end;
        } else {

            res.send({action: "failSave"});
            console.log(err);
            res.end;
        }
    });



};

exports.getAll = function (req, res) {

    var query = db.eventModel.find({});
   // query.select('subjectId');
    query.exec(function (err, queryRes) {
        if (err) {
            return handleError(err)
        } else {
            res.send(JSON.stringify(queryRes));
            res.end;
        }
    });

};


exports.getNotApproved = function (req, res) {


};

