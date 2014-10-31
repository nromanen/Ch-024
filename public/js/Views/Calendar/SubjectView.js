define('SubjectView', [
    'jquery',
    'underscore',
    'backbone',
    'jqueryui',
    'fullcalendar',
    'SessionModel',
    'ConfirmModalTemplateView',
    'text!newSubjectTemplate'
], function(
    $,
    _,
    Backbone,
    jqueryui,
    fullcalendar,
    SessionModel,
    ConfirmModalTemplateView,
    newSubjectTemplate) {
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
            this.$(this.selectors.removeSubjectButton).on('click', $.proxy(this._showModalConfirm, this));
        },

        _showModalConfirm: function() {
            new ConfirmModalTemplateView({
                model: this.model,
                remove: this._removeSubject,
                thatFromView: this
            }).render();
        },

        /**
         * Remove subject object.
         * deleteSubject() is the SubjectModel function for removing models
         */
        _removeSubject: function() {
            this.model.deleteSubject();
        },

        _removeDeleteButton: function() {
            if(SessionModel.getRole() === "teacher") {
                this.$('.removeSubject').remove();
            }
        },

        /* PUBLIC METHODS */

        render: function() {
            this.$el.html(this.template(this.model.toJSON())).draggable({
                zIndex: 999,
                revert: true, // will cause the event to go back to its
                revertDuration: 0 //  original position after the drag
            });
            this._removeDeleteButton();
            this.$el.addClass('fc-event');
            this.$el.data('subject', this.model);
            this._attachEvents();
            return this;
        }

    });

    return SubjectView;
});
