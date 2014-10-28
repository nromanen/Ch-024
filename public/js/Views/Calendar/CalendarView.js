define('CalendarView', ['jquery',
    'underscore',
    'backbone',
    'moment',
    'jqueryui',
    'fullcalendar',
    'CalendarEventModel',
    'ownpopover',
    'CalendarEventView',
    'UserModel',
    'SubscribeCollection',
    'SubscribeView',
    'SessionModel',
    'text!ownPopoverTemplate',
    'text!buttonAssignTemplate'
], function($,
    _,
    Backbone,
    moment,
    jqueryui,
    fullcalendar,
    CalendarEventModel,
    ownpopover,
    CalendarEventView,
    UserModel,
    SubscribeCollection,
    SubscribeView,
    Session,
    ownPopoverTemplate,
    buttonAssignTemplate) {

    var CalendarView = Backbone.View.extend({

        id: 'calendar',

        /**
         * Describes all the selectors we need.
         */
        selectors: {
            weekButton: '.fc-agendaWeek-button',
            scroll: '.fc-scroller'
        },

        initialize: function(options) {
            this.calendarEventsCollection = options.collection;
            this.calendarEventsCollection.on('add', this._renderCalendarEvent, this);
            this.userModel = new UserModel;
            this.subscribeCollection = new SubscribeCollection;
            this.subscribeCollection.fetch();
            this._fetchUserModel();
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
            return "rgba(" + parseInt(color.substring(1, 3), 16) + "," + parseInt(color.substring(3, 5), 16) + "," + parseInt(color.substring(5, 7), 16) + "," +
                OPACITY + ")";
        },

        _renderCalendarEvent: function(model) {
            this.$el.fullCalendar('renderEvent', _.extend(model.toJSON(), {
                className: 'calendar-event'
            }), true);
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
                color: this._convertHexColorToRGB(originalSubjectModel.getColor()),
                start: date
            });

            calendarEventModel.setCid(calendarEventModel.cid);
            this.calendarEventsCollection.add(calendarEventModel);
            //this.$el.fullCalendar('renderEvent', calendarEventModel.toJSON(), true);
        },

        /**
         * @param {Object} eventObject
         * Create Event View for updating and deleting event model.
         */
        _showCalendarEventModal: function(calendarEventObject) {
            var calendarEventModel = this.calendarEventsCollection.findWhere({
                cid: calendarEventObject.cid
            });
            calendarEventModel.trigger('showCalendarEventModal');
            new CalendarEventView({
                model: calendarEventModel,
                calendarEventObject: calendarEventObject
            });
        },

        _fetchUserModel: function() {
            this.userModel.set('_id', Calendar.Controller.session.getUserId());
            this.userModel.fetch();
        },

        _showAssignButton: function(amountOfStudents, currentCount) {
            var role = Session.getRole();
            this.buttonAssign = null;
            if (role === 'user') {
                if (!(amountOfStudents === currentCount)) {
                    this.buttonAssign = buttonAssignTemplate;
                } else {
                    this.buttonAssign = '<span class="glyphicon glyphicon-ok"></span>'
                }
            }
        },

        _showPopover: _.debounce(function(calendarEventObject, jsEvent, ui) {

            var calendarEventModel = this.calendarEventsCollection.findWhere({
                _id: calendarEventObject._id
            });
            if (!calendarEventModel) {
                return;
            }

            calendarEventModelObject = calendarEventModel.toJSON();
            this._showAssignButton(calendarEventModelObject.amountOfStudents, calendarEventModelObject.currentCount);

            $(jsEvent.target).ownpopover('show', {
                html: _.template(ownPopoverTemplate),
                content: _.extend(calendarEventModelObject, {
                    start: moment(calendarEventModelObject.start).format('YYYY-MM-DD HH:mm'),
                    end: moment(calendarEventModelObject.end).format('YYYY-MM-DD HH:mm'),
                    amountFreePlace: (calendarEventModelObject.amountOfStudents - calendarEventModelObject.currentCount),
                    buttonAssign: this.buttonAssign
                })
            });

            new SubscribeView({
                subscribeCollection: this.subscribeCollection,
                userModel: this.userModel,
                calendarEventModel: calendarEventModel,
                calendarEventsCollection: this.calendarEventsCollection
            });

            jsEvent.stopPropagation();
        }, 500, false),

        _resizeEvent: function(calendarEventObject) {
            var calendarEventModel = this.calendarEventsCollection.findWhere({
                cid: calendarEventObject.cid
            });
            if (!calendarEventModel) {
                return;
            }
            calendarEventModel.setEnd(calendarEventObject.end);
        },

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
                eventMouseover: _.bind(this._showPopover, this),
                eventResize: _.bind(this._resizeEvent, this)
            });
            $(this.selectors.scroll, this.$el).on('scroll', function() {
                $('.own-popover').remove();
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
