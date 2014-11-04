define('AssignedEventView', [
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'text!assignedEventTemplate'
], function(
    $,
    _,
    Backbone,
    moment,
    assignedEventTemplate) {

    var AssignedEventView = Backbone.View.extend({

        template: _.template(assignedEventTemplate),

        render: function() {
            var CalendarEvent = this.model.get('event');

            this.$el.html(this.template({
                color: CalendarEvent.color,
                title: CalendarEvent.title,
                start: moment(CalendarEvent.start).format('HH:mm Do MMM YYYY'),
                end: moment(CalendarEvent.end).format('HH:mm Do MMM YYYY'),
                classroom: CalendarEvent.classroom
            }));
            return this;
        }

    });

    return AssignedEventView;

});
