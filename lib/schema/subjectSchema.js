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

    categoryId: {
        type: String,
    /*    type: Object,*/
        required: true
    },

    approved: {
        type: Boolean,
        default: false,
        required: true
    }

});