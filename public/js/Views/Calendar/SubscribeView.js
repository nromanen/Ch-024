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
            this.calendarEventModel.on('change', this._updateCalendarEventCollection, this);
        },

        _updateCalendarEventCollection: function(model) {
            // console.log(model);
        },

        _assignToSubject: function() {
            subscribeModel = new SubsсribeModel;
            subscribeModel.setUser(this.userModel.toJSON());
            subscribeModel.setEvent(this.calendarEventModel.toJSON());

            var that = this;

            $.ajax({
                    url: '/subscribe',
                    type: 'POST',
                    data: subscribeModel.toJSON(),
                })
                .done(function() {
                    ControllerView.showAlertSuccess(that.messages.success);
                    that.subscribeCollection.fetch();
                    // that.calendarEventsCollection.fetch();

                    $.ajax({
                        url: '/event/' + that.calendarEventModel.getId(),
                        type: 'GET'
                    })
                    .done(function(model) {
                        that.calendarEventModel.set(JSON.parse(model));
                        
                    })
                    .fail(function() {
                        console.log("error");
                    });

                })
                .fail(function() {
                    ControllerView.showAlertError(that.messages.error);
                });
        }

    });

    return SubscribeView;
});
