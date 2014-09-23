define('SubjectView', ['jquery', 'underscore', 'backbone', 'jqueryui', 'fullcalendar',
    'text!../js/Templates/newSubjectTemplate.html'], function($, _, Backbone, jqueryui, fullcalendar, newSubjectTemplate) {
    var SubjectView = Backbone.View.extend({

        selectors: {
            removeSubjectButton: ".removeSubject",
            subjectButton: ".divSubject"
        },

        template: _.template(newSubjectTemplate),

        initialize: function() {
            this.model.bind('destroy', this.remove, this);
        },

        /* PRIVATE METHODS */

        /**
         * Handle all events
         */
        _attachEvents: function() {
            this.$(this.selectors.removeSubjectButton).on('click', $.proxy(this._removeSubject, this));
        },

        /**
         * Remove subject object.
         * deleteSubject() is the SubjectModel function for removing models
         */
        _removeSubject: function() {
            this.model.deleteSubject();
        },

        /* PUBLIC METHODS */

        render: function() {
            this.$el.html(this.template(this.model.toJSON())).draggable({
                zIndex: 999,
                revert: true, // will cause the event to go back to its
                revertDuration: 0 //  original position after the drag
            });
            this.$el.addClass('fc-event');
            this.$el.data('subject', this.model);
            this._attachEvents();
            return this;
        }

    });

    return SubjectView;
});
