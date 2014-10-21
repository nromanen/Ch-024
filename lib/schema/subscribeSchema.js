var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


exports.subscribeSchema = new Schema({
    eventId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }

});
