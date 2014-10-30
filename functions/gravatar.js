var cryptor = require('cryptor');

module.exports.getGravatar = function (email) {
    var url = 'http://www.gravatar.com/avatar/';
    url += cryptor.md5(email);
    return url;

};