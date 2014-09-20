var CalendarView = Backbone.View.extend ({

    calendarContainer: $('#calendarContainer'),

    id: 'calendar',
    /**
     * Describes all the selectors we need.
     */
    selectors: {
        weekButton:            '.fc-agendaWeek-button',
        removeSubjectCheckbox: '#drop-remove'
    },

    initialize: function(options){
        this.eventsCollection = options.collection;
    },

    /* PRIVATE METHODS */

    /**
    * Connect all widgets
    */
    _initWidgets: function() {
        this._initCalendarWidget();
    },

    _convertHexColorToRGB: function(color) {
        return "rgba(" + parseInt(color.substring(1,3),16) + ","
            + parseInt(color.substring(3,5),16) + "," + parseInt(color.substring(5,7),16) + ", .5)";
    },

     /**
      * @param {Date} date
      * @param {JS Event} jsEvent
      * Add new event object after dropping subject object into calendar.
      */
    _addEvent: function(date, jsEvent, ui) {
        var originalSubjectModel = $(jsEvent.target).data('subject');
        var eventModel = new EventModel({
            subject: originalSubjectModel,
            title: originalSubjectModel.getTitleAttribute(),
            color:  this._convertHexColorToRGB(originalSubjectModel.getColorAttribute()) ,
            start: date
        });
        this.eventsCollection.add(eventModel);
        this.$el.fullCalendar('renderEvent', eventModel.toJSON(), true);
    },

    /**
    * @param {Object} eventObject
    * Create Event View for updating and deleting event model.
    */
    _showEventModal: function(eventObject) {
        var eventModel = this.eventsCollection.findWhere({title: eventObject.title});
        eventModel.trigger('click');
        new EventView({
            model: eventModel,
            eventObject: eventObject
        });
    },

    _showPopover: _.debounce(function(eventObject, jsEvent, ui) {
        var eventModel = this.eventsCollection.findWhere({title: eventObject.title}).toJSON();
        $(jsEvent.target).ownpopover({
            showEvent: 'mouseover',
            hideEvent: 'mouseout',
            html: _.template($('#ownPopoverTemplate').html()),
            content: _.extend(eventModel, {
                start: eventModel.start.format('YYYY-MM-DD HH:mm')
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
            eventClick: _.bind(this._showEventModal, this),
            eventMouseover: _.bind(this._showPopover, this)
        });
    },

    /* PUBLIC METHODS */

    render: function() {
        $('#calendarContainer').html(this.$el);
        this._initWidgets();
        return this;
    }

});