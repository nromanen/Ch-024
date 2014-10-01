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
        type: Boolean
    },
    textColor: {
        type: Boolean
    },
    classroom: {
        type: Boolean
    },

    amountOfStudents:{
        type: Number
    },
    currentCount:{
        type: Number,
        required: true
    },
    users:{
        type: Array,
        required: true
    }
});