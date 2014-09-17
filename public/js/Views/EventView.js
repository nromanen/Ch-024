var EventView = Backbone.View.extend({

    selectors: {
        saveEventChangesButton: '.saveBtn',
        deleteEventButton: '.deleteBtn',
        cancelButton:'.cancelBtn',
        classroomForExamInput: '.classForExam',
        amountOfStudentsInput: '.amountOfStud'
    },

    initialize: function(options) {
        this.eventObject = options.eventObject;
        this.model.off().on('click', this.render, this);
    },

    /*PRIVATE METHODS*/

    _attachEvents: function() {
        this.$(this.selectors.saveEventChangesButton).on('click', $.proxy(this._saveEventChanges,this));
        this.$(this.selectors.deleteEventButton).on('click', $.proxy(this._deleteEvent,this));
        this.$(this.selectors.cancelButton).on('click', $.proxy(this._shutdownModalWindow,this));
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
            color: this.eventObject.color.substr(0,this.eventObject.color.length- 3)+'1)'
        });
        this.eventObject.editable = false;
        this.eventObject.textColor = 'black';
        this.eventObject.color = this.eventObject.color.substr(0,this.eventObject.color.length- 3)+'1)';

         },

    /**
     * Update fullCalendar
     */
    _saveEventChanges: function() {
        this._updateCalendarEvent();
        $("#calendar").fullCalendar('updateEvent', this.eventObject);

        this._shutdownModalWindow();
     },

    _deleteEvent: function() {
        this._shutdownModalWindow();
     },

    /**
     * Shutdown the Modal Window
     */
    _shutdownModalWindow: function() {
        this.remove();
        $('.modal-backdrop').remove();
    },

    /**
     * Set correct template
     */
    _setTemplate: function() {
        if(this.model.get('editable') === true){
            this.template = _.template($('#saveEventModalWindowTemplate').html());
            return;
        }
        this.template = _.template($('#deleteEventModalWindowTemplate').html());
    },

    /*PUBLIC METHODS*/

    render: function() {
        this._setTemplate();
        this.$el = $(this.template(this.model.toJSON()));
        this.$el.modal('show');
        this._attachEvents();
        return this;
    }

});