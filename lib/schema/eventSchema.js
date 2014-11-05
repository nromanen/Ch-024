var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

exports.eventSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    subjectId: {
        type: String,
        required: true
    },

    subject: {
        type: Object

    },

    start: {
        type: String,
        unique: true,
        required: true
    },

    end: {
        type: String,
        unique: false

    },

    editable: {
        type: Boolean
    },

    color: {
        type: String
    },

    textColor: {
        type: String
    },

    classroom: {
        type: String
    },

    authorId: {
        type: String
    },

    amountOfStudents: {
        type: Number
    },

    currentCount: {
        type: Number,
        required: true
    }
});
