var fs = require('fs');
var auth = require('../lib/auth.js'),
    cryptor = require('cryptor');

exports.index = function (req, res) {
    res.sendfile('public/calendar.html');

    console.log(cryptor.compare(cryptor.md5('12345'),'827ccb0eea8a706c4c34a16891f84e7b'));



    res.end;
};








