define('CalendarEventView', ['jquery', 'underscore', 'backbone', 'text!../js/Templates/saveEventModalWindowTemplate.html',
    'text!../js/Templates/deleteEventModalWindowTemplate.html'],
    function($, _, Backbone, saveEventModalWindowTemplate, deleteEventModalWindowTemplate) {
    var CalendarEventView = Backbone.View.extend({

        selectors: {
            saveEventButton:        '.saveBtn',
            deleteEventButton:      '.deleteBtn',
            cancelButton:           '.cancelBtn',
            classroomForExamInput:  '.classForExam',
            amountOfStudentsInput:  '.amountOfStud'
        },

        initialize: function(options) {
            this.calendarEventObject = options.calendarEventObject;
            this.model.off().on('showCalendarEventModal', this.render, this);
        },

        /* PRIVATE METHODS */

        _attachEvents: function() {
            this.$(this.selectors.saveEventButton).on('click', $.proxy(this._saveEvent,this));
            this.$(this.selectors.deleteEventButton).on('click', $.proxy(this._deleteEvent,this));
        },

        /**
         * Update the attributes of model.
         * Also update some attributes of eventObject because we need to update fullCalendar later
         */
        _updateCalendarEvent: function() {
            this.model.setAmountOfStudents(parseInt(this.$(this.selectors.amountOfStudentsInput).val()));
            this.model.setClassroom(this.$(this.selectors.classroomForExamInput).val());
            this.model.setEditable(false);
            this.model.setTextColor('black');
            this.model.setColor(this.calendarEventObject.color.substr(0,this.calendarEventObject.color.length - 3) + '1)');
            this.calendarEventObject.editable = false;
            this.calendarEventObject.textColor = 'black';
            this.calendarEventObject.color = this.calendarEventObject.color.substr(0,this.calendarEventObject.color.length - 3) + '1)';

        },

        /**
         * Update fullCalendar
         */
        _saveEvent: function() {
            this._updateCalendarEvent();
            $("#calendar").fullCalendar('updateEvent', this.calendarEventObject);
        },

        _deleteEvent: function() {

        },

        /**
         * Set correct template
         */
        _setTemplate: function() {
            if(this.model.getEditable() === true){
                this.template = _.template(saveEventModalWindowTemplate);
                return;
            }
            this.template = _.template(deleteEventModalWindowTemplate);
        },

        /* PUBLIC METHODS */

        render: function() {
            this._setTemplate();
            this.$el = $(this.template(this.model.toJSON()));
            this.$el.modal('show');
            this._attachEvents();
            return this;
        }

    });

    return CalendarEventView;
});
