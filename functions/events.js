var db = require('../lib/mongoose');


exports.create = function (req, res) {
    var data = new db.subjectModel({
        title: req.body.title,
        subjectId: req.body.subjectId,
        start: req.body.start,
        end: req.body.end,
        editable: true,
        color: '',
        textColor: 'red',
        classroom : '',
        amountOfStudents: 0
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


};


exports.getNotApproved = function (req, res) {


};

