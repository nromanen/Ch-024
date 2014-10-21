var mongoose = require('mongoose'),
    log = require('./log.js')(module),
    config = require('./configuration/config.js'),
    userSchema = require('./schema/userSchema').UserSchema,
    subjectSchema = require('./schema/subjectSchema').subjectSchema,
    categorySchema = require('./schema/categorySchema').categorySchema,
	eventSchema = require('./schema/eventSchema').eventSchema,
	subscribeSchema = require('./schema/subscribeSchema').subscribeSchema;
/*
* Connect to DB
* */
//mongoose.connect(config.nconf.get('mongoose:url'));

mongoose.connect(config.get('mongoose:url'));

var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback() {
    log.info("Connected to DB!");
});


/* User model Schema */
module.exports.userModel = mongoose.model('users', userSchema);

/*Subject model schema */
module.exports.subjectModel = mongoose.model('subject', subjectSchema);

/*category model schema */
module.exports.categoryModel = mongoose.model('category', categorySchema);

/*event model schema */
module.exports.eventModel = mongoose.model('event', eventSchema);

/*subscribe model schema */
module.exports.subscribeModel = mongoose.model('subscribe', subscribeSchema);
