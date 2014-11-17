define('CabinetEventsView', [
    'jquery',
    'underscore',
    'backbone',
    'CabinetEventView',
    'CabinetModel'
],
    function (
        $,
        _,
        Backbone,
        CabinetEventView) {

        var CabinetEventsView = Backbone.View.extend({

            initialize: function (options) {
                this.collection.on('add', this._renderCabinetEvent, this);
                this.collection.fetch();
            },

            _renderCabinetEvent: function (model) {
                if (model.getEvent().authorId === Calendar.Controller.session.getUserId()) {
                    $('.teacherCabinet').append(
                        new CabinetEventView({
                            model: model
                        }).render().el);
                }
            },

            render: function () {
                this._renderCabinetEvent();
                return this;
            }

        });

        return CabinetEventsView;

    }

);