define('SubscribeView', [
    'jquery',
    'underscore',
    'backbone',
    'SubscribeModel',
    'ControllerView'
],
    function(
        $,
        _,
        Backbone,
        SubscribeModel,
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
                },
                errorConflict: {
                    message: 'You are already assigned to this event'
                }
            },

            initialize: function(options) {
                this.subscribeCollection = options.subscribeCollection
                this.userModel = options.userModel;
                this.calendarEventsCollection = options.calendarEventsCollection;
                this.calendarEventModel = options.calendarEventModel;
                $(this.selectors.assignButton).on('click', $.proxy(this._assignToSubject, this));
            },

            _assignToSubject: function() {
                subscribeModel = new SubscribeModel;
                subscribeModel.setUser(this.userModel.toJSON());
                subscribeModel.setEvent(this.calendarEventModel.toJSON());

                var that = this;

                $.ajax({
                        url: '/subscribe',
                        type: 'POST',
                        data: subscribeModel.toJSON(),
                        statusCode: {
                            409: function() {
                                ControllerView.showAlertError(that.messages.errorConflict);
                            }
                        }
                    })

                .done(function() {
                    ControllerView.showAlertSuccess(that.messages.success);
                    that.subscribeCollection.fetch();
                    $('.showNearestEvents ').trigger('click');

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

                .always(function() {
                    $('.own-popover').fadeOut('fast');
                });
            }

        });

        return SubscribeView;

    }

);
