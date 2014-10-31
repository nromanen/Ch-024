define('CabinetEventsView', ['jquery', 'underscore', 'backbone', 'CabinetEventView', 'CabinetModel'],
    function($, _, Backbone, CabinetEventView, CabinetModel) {

        var CabinetEventsView = Backbone.View.extend({

            initialize: function(options) {
                this.collection.on('add', this._renderCabinetEvent, this);
                this.collection.fetch();
            },

            _renderCabinetEvent: function(model) {
                $('.teacherCabinet').append(
                new CabinetEventView({
                    model: model
                }).render().el);
            },

            render: function() {
                this._renderCabinetEvent();
                return this;
            }
        });
        return CabinetEventsView;
    });
