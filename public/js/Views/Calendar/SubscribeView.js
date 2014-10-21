define('SubscribeView', ['jquery',
    'underscore',
    'backbone',
    'SubsсribeModel',
    'text!alertError',
    'text!alertSuccess'
], function($,
    _,
    Backbone,
    SubsсribeModel,
    alertError,
    alertSuccess) {
    var SubscribeView = Backbone.View.extend({

        selectors: {
            assignButton: '.btnAssigntoEvent'
        },

        messages: {
            succses: {
                message: 'You are assign to this subject'
            },
            error: {
                message: 'You are not assign to this subject'
            }
        },

        templateAlertError: _.template(alertError),
        templateAlertSuccess: _.template(alertSuccess),

        initialize: function(options) {
            this.userModel = options.userModel;
            this.calendarEventModel = options.calendarEventModel;

            $(this.selectors.assignButton).on('click', $.proxy(this._assignToSubject, this));
        },

        _assignToSubject: function() {
            subscribeModel = new SubsсribeModel;
            subscribeModel.setUserId(this.userModel.id);
            subscribeModel.setEventId(this.calendarEventModel.getId());

            that = this;

            $.ajax({
                    url: '/subscribe',
                    type: 'POST',
                    data: subscribeModel.toJSON(),
                })
                .done(function() {
                    $('.forAlert').html(that.templateAlertSuccess(that.messages.succses));
                })
                .fail(function() {
                    $('.forAlert').html(that.templateAlertError(that.messages.error));
                });
        }

    });

    return SubscribeView;
});
