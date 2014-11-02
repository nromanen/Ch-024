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

        selectors: {
            buttonShowPastEvents: '.showPastEvents',
            buttonShowNearestEvents: '.showNearestEvents',
            assignedContainer: '.assignContainer',
            titleOfSubscribe: '.titleSubscribe'
        },

        initialize: function(options) {
            this.collection.on('add', this._renderAssignedEvent, this);
            $(this.selectors.buttonShowPastEvents).on('click', $.proxy(this.showPastEvents, this))
            $(this.selectors.buttonShowNearestEvents).on('click', $.proxy(this.showNearestEvents, this))
            this.collection.fetchNearestEvents(Session.getUserId());
            $(this.selectors.buttonShowNearestEvents).hide();
            this._runClock();
        },

        showNearestEvents: function() {
            var that = this;
            $(this.selectors.buttonShowNearestEvents).hide();
            $(this.selectors.buttonShowPastEvents).show();
            $(this.selectors.titleOfSubscribe).html('Your nearest Events:');
            $(this.selectors.assignedContainer).fadeOut('fast', function() {
                    that.collection.fetchNearestEvents(Session.getUserId());
            })
            .fadeIn('fast');
        },

        showPastEvents: function() {
            var that = this;
            $(this.selectors.buttonShowPastEvents).hide();
            $(this.selectors.buttonShowNearestEvents).show();
            $(this.selectors.titleOfSubscribe).html('Your past Events:');
            $(this.selectors.assignedContainer).fadeOut('fast', function() {
                    that.collection.fetchPastEvents(Session.getUserId());
            })
            .fadeIn('fast');
        },

        _runClock: function() {
            function update() {
                $('#clock').html(moment().format('ddd MMMM D YYYY H:mm:ss'));
            }
            setInterval(update, 1000);
        },

        _renderAssignedEvent: function(model) {
            $(this.selectors.assignedContainer).append(
                new AssignedEventView({
                    model: model
                }).render().el);
        }
    });
    return AssignedEventsView;
});
