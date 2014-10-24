var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


exports.subscribeSchema = new Schema({
    event: {
        type: Object,
        required: true
    },
    user: {
        type: Object,
        required: true
    }

});
