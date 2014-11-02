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
    textColor: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    authorId:{
        type: String,
        required: true
    },

    approved: {
        type: Boolean,
        default: false,
        required: true
    }

});