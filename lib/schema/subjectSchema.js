var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

exports.subjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },

    catId: {
        type: String,
        required: true
    },
    /*
     * unconfirmed  - непідтверджений, дефолт
     * */
    approved: {
        type: Boolean,
        default: false,
        required: true
    }

});