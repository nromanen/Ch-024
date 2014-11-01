define('AssignedEventsView', [
    'jquery',
    'underscore',
    'backbone',
    'SessionModel',
    'AssignedEventView'
], function(
    $,
    _,
    Backbone,
    Session,
    AssignedEventView) {

    var AssignedEventsView = Backbone.View.extend({

        initialize: function(options) {
            this.collection.on('add', this._renderAssignedEvent, this);
            this.collection.fetchAssignedStudent(Session.getUserId());
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
