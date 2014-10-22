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
            this.userModel = options.userModel;
            this.calendarEventModel = options.calendarEventModel;
            $(this.selectors.assignButton).on('click', $.proxy(this._assignToSubject, this));
        },

        _assignToSubject: function() {
            subscribeModel = new SubsсribeModel;
            subscribeModel.setUserId(this.userModel.id);
            subscribeModel.setEventId(this.calendarEventModel.getId());

            var that = this;

            $.ajax({
                    url: '/subscribe',
                    type: 'POST',
                    data: subscribeModel.toJSON(),
                })
                .done(function() {
                    ControllerView.showAlertSuccess(that.messages.success);
                    
                })
                .fail(function() {
                    ControllerView.showAlertError(that.messages.error);
                });
        }

    });

    return SubscribeView;
});
