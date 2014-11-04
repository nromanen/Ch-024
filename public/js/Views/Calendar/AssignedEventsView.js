define('AssignedEventsView', [
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'SessionModel',
    'AssignedEventView',
    'text!assignedEventsTemplate'
], function(
    $,
    _,
    Backbone,
    moment,
    Session,
    AssignedEventView,
    assignedEventsTemplate) {

    var AssignedEventsView = Backbone.View.extend({

        template: _.template(assignedEventsTemplate),

        initialize: function(options) {
            this.$el = $(this.template());

            this.collection.on('add', this._renderAssignedEvent, this);
            this.$('.showPastEvents').on('click', $.proxy(this.showPastEvents, this));
            this.$('.showNearestEvents').on('click', $.proxy(this.showNearestEvents, this));
            this.collection.fetchNearestEvents(Session.getUserId());
            this.$('.showNearestEvents').hide();
            this._runClock();
        },

        showNearestEvents: function() {
            var that = this;
            this.$('.showNearestEvents').hide();
            this.$('.showPastEvents').show();
            this.$('.titleSubscribe').html('Your nearest Events:');
            this.$('.assignContainer').fadeOut('fast', function() {
                    that.collection.fetchNearestEvents(Session.getUserId());
                })
                .fadeIn('fast');
        },

        showPastEvents: function() {
            var that = this;
            this.$('.showPastEvents').hide();
            this.$('.showNearestEvents').show();
            this.$('.titleSubscribe').html('Your past Events:');
            this.$('.assignContainer').fadeOut('fast', function() {
                    that.collection.fetchPastEvents(Session.getUserId());
                })
                .fadeIn('fast');
        },

        _runClock: function() {
            function update() {
                this.$('#clock').html(moment().format('ddd MMMM D YYYY H:mm:ss'));
            }
            setInterval(update, 1000);
        },

        _renderAssignedEvent: function(model) {
            this.$('.assignContainer').append(
                new AssignedEventView({
                    model: model
                }).render().el);
        },

        render: function() {
            return this.$el;
        }

    });

    return AssignedEventsView;

});
