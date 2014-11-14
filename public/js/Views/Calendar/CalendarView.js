define('CalendarView', [
    'jquery',
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
    'text!ownPopoverTemplate',
    'text!buttonAssignTemplate'
], function(
    $,
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
    ownPopoverTemplate,
    buttonAssignTemplate) {

    var CalendarView = Backbone.View.extend({

        id: 'calendar',

        selectors: {
            weekButton: '.fc-agendaWeek-button',
            scroll: '.fc-scroller',
            showOwnEvents: '.watchMyEvents',
            showAllEvents: '.watchAllEvents'

        },

        initialize: function(options) {
            this.calendarEventsCollection = options.collection;
            this._attachEvents();
            this.userModel = new UserModel;
            this.subscribeCollection = new SubscribeCollection;
            this.subscribeCollection.fetch();
            this._fetchUserModel();
        },

        _attachEvents: function() {
            this.calendarEventsCollection.on('add', this._renderCalendarEvent, this);
            $(this.selectors.showOwnEvents).on('click', $.proxy(this._showOwnEvents, this));
            $(this.selectors.showAllEvents).on('click', $.proxy(this._showAllEvents, this));
        },

        _initWidgets: function() {
            this._initCalendarWidget();
        },

        _convertHexColorToRGB: function(color) {
            var OPACITY = .5;
            return "rgba(" + parseInt(color.substring(1, 3), 16) + "," +
                parseInt(color.substring(3, 5), 16) + "," +
                parseInt(color.substring(5, 7), 16) + "," +
                OPACITY + ")";
        },

        _renderCalendarEvent: function(model) {
            this.$el.fullCalendar('renderEvent', _.extend(model.toJSON(), {
                className: 'calendar-event'
            }), true);
        },

        _addEvent: function(date, jsEvent, ui) {
            var originalSubjectModel = $(jsEvent.target).data('subject'),
                calendarEventModel = new CalendarEventModel({
                subject: originalSubjectModel,
                title: originalSubjectModel.getTitle(),
                color: this._convertHexColorToRGB(originalSubjectModel.getColor()),
                textColor: originalSubjectModel.getTextColor(),
                start: date
            });
            calendarEventModel.setCid(calendarEventModel.cid);
            calendarEventModel.setEnd(moment(calendarEventModel.getStart()).add(2, 'h'));
            this.calendarEventsCollection.add(calendarEventModel);
        },

        _showCalendarEventModal: function(calendarEventObject) {
            var calendarEventModel = this.calendarEventsCollection.findWhere({
                _id: calendarEventObject._id
            });
            if (!calendarEventModel) {
                calendarEventModel = this.calendarEventsCollection.findWhere({
                    cid: calendarEventObject.cid
                });
            }
            
            new CalendarEventView({
                model: calendarEventModel,
                calendarEventObject: calendarEventObject
            });

            if (Calendar.Controller.session.hasPermission('events', 'create') ||
                Calendar.Controller.session.hasPermission('events', 'delete')) {
                calendarEventModel.trigger('showCalendarEventModal');
            }     
        },

        _fetchUserModel: function() {
            this.userModel.set('_id', Calendar.Controller.session.getUserId());
            this.userModel.fetch();
        },

        _showAssignButton: function(amountOfStudents, currentCount) {
            this.buttonAssign = null;
            if (Calendar.Controller.session.hasPermission('events', 'subscribe')) {
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

           var calendarEventModelObject = calendarEventModel.toJSON();
            this._showAssignButton(calendarEventModelObject.amountOfStudents, calendarEventModelObject.currentCount);

            $(jsEvent.target).ownpopover('show', {
                html: _.template(ownPopoverTemplate),
                content: _.extend(calendarEventModelObject, {
                    start: moment(calendarEventModelObject.start).format('HH:mm '),
                    end: moment(calendarEventModelObject.end).format('HH:mm'),
                    thisDay: moment(calendarEventModelObject.end).format('Do MMM'),
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

        _updateCalendarEventAfterDrop: function(calendarEventObject, delta, revertFunc, jsEvent, ui, view) {
            var calendarEventModel = this.calendarEventsCollection.findWhere({
                cid: calendarEventObject.cid
            });
            if (!calendarEventModel) {
                return;
            }
            calendarEventModel.setStart(calendarEventObject.start);
            calendarEventModel.setEnd(calendarEventObject.end);
        },

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
                eventResize: _.bind(this._resizeEvent, this),
                eventDrop: _.bind(this._updateCalendarEventAfterDrop, this)
            });
            $(this.selectors.scroll, this.$el).on('scroll', function() {
                $('.own-popover').remove();
            });

            this.calendarEventsCollection.fetch();
        },

        _showOwnEvents: function() {
            var allEvents = this.$el.fullCalendar('clientEvents'),
                that = this;

            allEvents.forEach(function(event) {
                if (event.authorId != Calendar.Controller.session.getUserId()) {
                    that.$el.fullCalendar('removeEvents', event._id)
                }
            });

        },

        _showAllEvents: function() {
                var that = this;

            this.$el.fullCalendar( 'removeEvents');
            _.each(that.calendarEventsCollection.models, function(model){
                that.$el.fullCalendar('renderEvent', _.extend(model.toJSON(), {
                    className: 'calendar-event'
               }), true);
            });

        },

        render: function() {
            $('#calendarContainer').html(this.$el);
            this._initWidgets();
            return this;
        }

    });

    return CalendarView;

});
