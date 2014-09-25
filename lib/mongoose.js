var mongoose = require('mongoose');
var log = require('./log.js')(module);

var config = require('./config.js');


mongoose.connect('mongodb://localhost/softserve');

var db = mongoose.connection;
console.log(db);

db.on('error', function (err) {
	log.error('connection error:', err.message);
});
db.once('open', function callback() {
	log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

/* User model Schema */



var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},

	email: {
		type: String,
		unique: true,
		required: true
	},
	phone: {
		type: String,
		unique: false,
		required: true
	},
	password: {
		type: String,
		required: true
	},
    /* Roles
     * admin - full access
     * teacher - partial access
     * user - read only, enter the course
     * unconfirmed - not confirmed teacher registration
     *
     * * */
    role: {
        type: String,
        required: true,
        default: 'user'
    }
});
var userModel = mongoose.model('users', UserSchema);

/*Subject model schema */
var subjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },

    catId: {
        type: Number,
        required: true
    },
/*
* unconfirmed  - непідтверджений, дефолт
* */
    status: {
        type: String,
        default: 'unconfirmed',
        required: true
    }

});
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