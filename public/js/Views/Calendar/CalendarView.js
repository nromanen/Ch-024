define('CalendarView', ['jquery', 'underscore', 'backbone', 'moment', 'jqueryui',
    'fullcalendar', 'CalendarEventModel', 'ownpopover', 'CalendarEventView', 'text!ownPopoverTemplate'],
    function($, _, Backbone, moment, jqueryui, fullcalendar, CalendarEventModel, ownpopover, CalendarEventView, ownPopoverTemplate) {

    var CalendarView = Backbone.View.extend({

    id: 'calendar',

    /**
     * Describes all the selectors we need.
     */
    selectors: {
        weekButton: '.fc-agendaWeek-button'
    },

    initialize: function(options){
        this.calendarEventsCollection = options.collection;
    },

    /* PRIVATE METHODS */

    /**
    * Connect all widgets
    */
    _initWidgets: function() {
        this._initCalendarWidget();
    },

    _convertHexColorToRGB: function(color) {
        var OPACITY = .5;
        return "rgba(" + parseInt(color.substring(1,3),16) + ","
            + parseInt(color.substring(3,5),16) + "," + parseInt(color.substring(5,7),16) + ","+
            OPACITY +")";
    },

     /**
      * @param {Date} date
      * @param {JS Event} jsEvent
      * Add new event object after dropping subject object into calendar.
      */
    _addEvent: function(date, jsEvent, ui) {
        var originalSubjectModel = $(jsEvent.target).data('subject');
        var calendarEventModel = new CalendarEventModel({
            subject: originalSubjectModel,
            title: originalSubjectModel.getTitle(),
            color:  this._convertHexColorToRGB(originalSubjectModel.getColor()) ,
            start: date
        });
        this.calendarEventsCollection.add(calendarEventModel);
        this.$el.fullCalendar('renderEvent', calendarEventModel.toJSON(), true);
    },

    /**
    * @param {Object} eventObject
    * Create Event View for updating and deleting event model.
    */
    _showCalendarEventModal: function(calendarEventObject) {
        var calendarEventModel = this.calendarEventsCollection.findWhere({title: calendarEventObject.title});
        calendarEventModel.trigger('showCalendarEventModal');
        new CalendarEventView({
            model: calendarEventModel,
            calendarEventObject: calendarEventObject
        });
    },

    _showPopover: _.debounce(function(calendarEventObject, jsEvent, ui) {
        var calendarEventModel = this.calendarEventsCollection.findWhere({title: calendarEventObject.title}).toJSON();
        $(jsEvent.target).ownpopover({
            showEvent: 'mouseover',
            hideEvent: 'mouseout',
            html: _.template(ownPopoverTemplate),
            content: _.extend(calendarEventModel, {
            start: calendarEventModel.start.format('YYYY-MM-DD HH:mm')
            })
        });
        $('.own-popover').remove();
    }, 150, false),

    /**
     * Connect fullCalendar widget.
     */
    _initCalendarWidget: function() {
        this.$el.fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay',
                ignoreTimezone: false
            },
            selectable: true,
            selectHelper: false,
            timezone: 'local',
            defaultView: 'agendaWeek',
            editable: true,
            droppable: true,
            lang: "uk",
            drop: _.bind(this._addEvent, this),
            eventClick: _.bind(this._showCalendarEventModal, this),
            eventMouseover: _.bind(this._showPopover, this)
        });

        this.calendarEventsCollection.fetch();
    },

    /* PUBLIC METHODS */

    render: function() {
        $('#calendarContainer').html(this.$el);
        this._initWidgets();
        return this;
    }

});
        return CalendarView;
    });