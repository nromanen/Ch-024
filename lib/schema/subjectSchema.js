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