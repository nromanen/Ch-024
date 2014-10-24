define('SubsсribeModel', ['jquery',
    'underscore',
    'backbone',
    'UserModel',
    'CalendarEventModel'
], function($,
    _,
    Backbone,
    UserModel,
    CalendarEventModel) {
    var SubsсribeModel = Backbone.Model.extend({

        url: '/subscribe',

        defaults: function() {
            return {
                _id: '',
                user: UserModel,
                event: CalendarEventModel
            }
        },

        setUser: function(value) {
            this.set('user', value);
        },

        getUser: function() {
            return this.get('user');
        },

        setEvent: function(value) {
            this.set('event', value);
        },

        getEvent: function() {
            return this.get('event');
        }

    });

    return SubsсribeModel;
});
