var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

exports.UserSchema = new Schema({
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
