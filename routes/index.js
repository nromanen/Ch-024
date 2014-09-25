var fs = require('fs');
var auth = require('../lib/auth.js');


exports.index = function (req, res) {
    res.sendfile('public/calendar.html');
    res.end;
};








