define('SubscribeView', ['jquery',
    'underscore',
    'backbone',
    'SubsсribeModel',
    'ControllerView'
], function($,
    _,
    Backbone,
    SubsсribeModel,
    ControllerView) {
    var SubscribeView = Backbone.View.extend({

        selectors: {
            assignButton: '.btnAssigntoEvent'
        },

        messages: {
            success: {
                message: 'You are assign to this subject'
            },
            error: {
                message: 'You are not assign to this subject'
            }
        },

        initialize: function(options) {
            this.subscribeCollection = options.subscribeCollection
            this.userModel = options.userModel;
            this.calendarEventsCollection = options.calendarEventsCollection;
            this.calendarEventModel = options.calendarEventModel;
            $(this.selectors.assignButton).on('click', $.proxy(this._assignToSubject, this));
            
            console.log(this.subscribeCollection);
        },

        _assignToSubject: function() {
            subscribeModel = new SubsсribeModel;
            subscribeModel.setUser(this.userModel.toJSON());
            subscribeModel.setEvent(this.calendarEventModel.toJSON());

            var that = this;

            console.log(subscribeModel.toJSON());

            $.ajax({
                    url: '/subscribe',
                    type: 'POST',
                    data: subscribeModel.toJSON(),
                })
                .done(function() {
                    ControllerView.showAlertSuccess(that.messages.success);
                    that.subscribeCollection.fetch();
                    that.calendarEventsCollection.fetch();
                })
                .fail(function() {
                    ControllerView.showAlertError(that.messages.error);
                });
        }

    });

    return SubscribeView;
});
