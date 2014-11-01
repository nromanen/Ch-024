define('AssignedEventsView', [
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'SessionModel',
    'AssignedEventView'
], function(
    $,
    _,
    Backbone,
    moment,
    Session,
    AssignedEventView) {

    var AssignedEventsView = Backbone.View.extend({

        initialize: function(options) {
            this.collection.on('add', this._renderAssignedEvent, this);
            this.collection.fetchAssignedStudent(Session.getUserId());
            this._runClock();
        },

        _runClock: function() {
            // $('#clock').fitText(1.3);

            function update() {
                $('#clock').html(moment().format('ddd MMMM D YYYY H:mm:ss'));
            }

            setInterval(update, 1000);
        },

        _renderAssignedEvent: function(model) {
            $('.assignContainer').append(
                new AssignedEventView({
                    model: model
                }).render().el);
        }
    });
    return AssignedEventsView;
});
