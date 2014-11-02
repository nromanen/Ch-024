var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


exports.categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    authorId: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false,
        required: true
    }

});