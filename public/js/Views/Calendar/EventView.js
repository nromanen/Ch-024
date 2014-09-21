define('EventView', ['jquery', 'underscore', 'backbone', 'text!../js/Templates/saveEventModalWindowTemplate.html',
    'text!../js/Templates/deleteEventModalWindowTemplate.html'],
    function($, _, Backbone, saveEventModalWindowTemplate, deleteEventModalWindowTemplate) {
    var EventView = Backbone.View.extend({

        selectors: {
            saveEventChangesButton: '.saveBtn',
            deleteEventButton: '.deleteBtn',
            cancelButton: '.cancelBtn',
            classroomForExamInput: '.classForExam',
            amountOfStudentsInput: '.amountOfStud'
        },

        initialize: function(options) {
            this.eventObject = options.eventObject;
            this.model.off().on('click', this.render, this);
        },

        /* PRIVATE METHODS */

        _attachEvents: function() {
            this.$(this.selectors.saveEventChangesButton).on('click', $.proxy(this._saveEventChanges, this));
            this.$(this.selectors.deleteEventButton).on('click', $.proxy(this._deleteEvent, this));
            this.$(this.selectors.cancelButton).on('click', $.proxy(this._cancelEvent, this));
        },

        /**
         * Update the attributes of model.
         * Also update some attributes of eventObject because we need to update fullCalendar later
         */
        _updateCalendarEvent: function() {
            this.model.set({
                amountOfStudents: parseInt(this.$(this.selectors.amountOfStudentsInput).val()),
                classroom: this.$(this.selectors.classroomForExamInput).val(),
                editable: false,
                textColor: 'black',
                color: this.eventObject.color.substr(0, this.eventObject.color.length - 3) + '1)'
            });
            this.eventObject.editable = false;
            this.eventObject.textColor = 'black';
            this.eventObject.color = this.eventObject.color.substr(0, this.eventObject.color.length - 3) + '1)';
            $('.modal-backdrop').remove();
        },

        /**
         * Update fullCalendar
         */
        _saveEventChanges: function() {
            this._updateCalendarEvent();
            $("#calendar").fullCalendar('updateEvent', this.eventObject);
            $('.modal-backdrop').remove();
        },

        _deleteEvent: function() {
            this.$el.modal('hide');
            $('.modal-backdrop').remove();
        },

        _cancelEvent: function() {
            this.$el.modal('hide');
            $('.modal-backdrop').remove();
        },

        /**
         * Set correct template
         */
        _setTemplate: function() {
            if (this.model.getEditableAttribute() === true) {
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

    return EventView;
});
