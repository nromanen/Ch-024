var mongoose = require('mongoose'),
    log = require('./log.js')(module),
    config = require('./config.js'),
    userSchema = require('./schema/userSchema').UserSchema,
    subjectSchema = require('./schema/subjectSchema').subjectSchema;
/*
* Connect to DB
* */
mongoose.connect('mongodb://localhost/softserve');
var db = mongoose.connection;


db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback() {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

/* User model Schema */
var userModel = mongoose.model('users', userSchema);

/*Subject model schema */
var subjectModel = mongoose.model('subject', subjectSchema);


/*category model schema */
var categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }

    /*
     * unconfirmed  - непідтверджений, дефолт
     * */
});

var categoryModel = mongoose.model('category', categorySchema);


module.exports.userModel = userModel;
module.exports.subjectModel = subjectModel;
module.exports.categoryModel = categoryModel;