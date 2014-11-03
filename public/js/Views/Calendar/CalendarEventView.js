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
            this.model.setTextColor('black');
            this.model.setColor(this.calendarEventObject.color.substr(0, this.calendarEventObject.color.length - 4) + '1)');
            this.calendarEventObject.editable = false;
            this.calendarEventObject.textColor = 'black';
            this.calendarEventObject.color = this.calendarEventObject.color.substr(0, this.calendarEventObject.color.length - 4) + '1)';
        },

        /**
         * Update fullCalendar
         */
        _saveEvent: function() {
            this._updateCalendarEvent();
            if (this.model.save(null, {
                    type: 'POST'
                })) {
                $("#calendar").fullCalendar('updateEvent', this.calendarEventObject);
                this._cancelModalWindow();
            }

        },

        _deleteEvent: function() {
            var that = this;
            $.ajax({
                    url: '/events/' + that.calendarEventObject._id,
                    type: 'DELETE',
                    data: that.model.toJSON()
                })
                .done(function() {
                    $("#calendar").fullCalendar('removeEvents', that.calendarEventObject._id);
                });
        },

        /**
         * Set correct template
         */
        _setTemplate: function() {
            if (this.model.getEditable() === true) {
                this.template = _.template(saveEventModalWindowTemplate);
                return;
            }
            this.template = _.template(deleteEventModalWindowTemplate);
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
