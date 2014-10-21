define('SubsсribeModel', ['jquery',
    'underscore',
    'backbone'
], function($,
    _,
    Backbone) {
    var SubsсribeModel = Backbone.Model.extend({

        urlRoot: '/subscribe',

        defaults: function() {
            return {
                _id: '',
                userId: '',
                eventId: ''
            }
        },

        setUserId: function(value) {
            this.set('userId', value);
        },

        getUserId: function() {
            return this.get('userId');
        },

        setEventId: function(value) {
            this.set('eventId', value);
        },

        getEventId: function() {
            return this.get('eventId');
        }

    });

    return SubsсribeModel;
});
