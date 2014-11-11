define('CalendarEventView', [
    'jquery',
    'underscore',
    'backbone',
    'text!saveEventModalWindowTemplate',
    'text!deleteEventModalWindowTemplate'
], function(
    $,
    _,
    Backbone,
    saveEventModalWindowTemplate,
    deleteEventModalWindowTemplate) {

    var CalendarEventView = Backbone.View.extend({

        selectors: {
            saveEventButton: '.saveBtn',
            deleteEventButton: '.deleteBtn',
            cancelButton: '.cancelBtn',
            classroomForExamInput: '.classForExam',
            amountOfStudentsInput: '.amountOfStud'
        },

        initialize: function(options) {
            this.calendarEventObject = options.calendarEventObject;
            this.model = options.model;
            this.model.off().on('showCalendarEventModal', this.render, this);
            this.model.bind('destroy', this.remove, this);
            this.model.on("invalid", $.proxy(this._defineValidationError, this));
        },

        /* PRIVATE METHODS */

        _attachEvents: function() {
            this.$el.on('keydown', $.proxy(this._keydownEnterEvent, this));
            this.$(this.selectors.saveEventButton).on('click', $.proxy(this._saveEvent, this));
            this.$(this.selectors.deleteEventButton).on('click', $.proxy(this._deleteEvent, this));
        },

        _keydownEnterEvent: function(event) {
            if (event.keyCode == 13) {
                this.$(this.selectors.saveEventButton).trigger('click');
                this.$(this.selectors.deleteEventButton).trigger('click');
            }
        },

        _defineValidationError: function(model, errors) {
            $('.errors').html('');
            _.each(errors, function(error) {
                $('.form-group #' + error.field + ' + .errors').append('<span>' + error.message + '</span>');
                $('#' + error.field).addClass('borderRed');
            }, this);
        },


        /**
         * Update the attributes of model.
         * Also update some attributes of eventObject because we need to update fullCalendar later
         */
        _updateCalendarEvent: function() {
            this.model.setAmountOfStudents(this.$(this.selectors.amountOfStudentsInput).val());
            this.model.setClassroom(this.$(this.selectors.classroomForExamInput).val());
            this.model.setEditable(false);
            this.model.setColor(this.calendarEventObject.color.substr(0, this.calendarEventObject.color.length - 4) + '1)');
            this.model.setAuthorId(localStorage.getItem('userSession'));
            this.calendarEventObject.editable = false;
            this.calendarEventObject.color = this.model.getColor();
        },

        /**
         * Update fullCalendar
         */
        _saveEvent: function() {
            var success = _.bind(function(model, response) {
                this.calendarEventObject._id = this.model.get('_id');
                $("#calendar").fullCalendar('updateEvent', this.calendarEventObject);
                this._cancelModalWindow();
            }, this);
            this._updateCalendarEvent();
            this.model.save(null,{success:success});

        },

        _deleteEvent: function() {
            this.model.destroy();
            $("#calendar").fullCalendar('removeEvents', this.calendarEventObject._id);
           this._cancelModalWindow();
        },

        /**
         * Set correct template
         */
        _setTemplate: function() {
            if (this.model.getEditable() === true) {
                this.template = _.template(saveEventModalWindowTemplate);
                return;
            }
            if(Calendar.Controller.session.getUserId() === this.model.getAuthorId()) {
                this.template = _.template(deleteEventModalWindowTemplate);
            }
        },

        _cancelModalWindow: function() {
            this.remove();
            $('.modal-backdrop').hide();
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
