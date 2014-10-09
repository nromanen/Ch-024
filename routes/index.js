var fs = require('fs');

exports.index = function (req, res) {
    res.sendfile('public/calendar.html');
    res.end;
};








