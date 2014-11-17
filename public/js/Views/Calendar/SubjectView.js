define('SubjectView', [
    'jquery',
    'underscore',
    'backbone',
    'jqueryui',
    'fullcalendar',
    'ConfirmModalTemplateView',
    'text!newSubjectTemplate'
],
    function(
        $,
        _,
        Backbone,
        jqueryui,
        fullcalendar,
        ConfirmModalTemplateView,
        newSubjectTemplate) {

        var SubjectView = Backbone.View.extend({

            selectors: {
                removeSubjectBtn: ".removeSubject"
            },

            template: _.template(newSubjectTemplate),

            initialize: function() {
                this.model.bind('destroy', this.remove, this);
            },

            _attachEvents: function() {
                this.$(this.selectors.removeSubjectBtn).on('click', $.proxy(this._showModalForConfirmDelete, this));
            },

            _showModalForConfirmDelete: function() {
                new ConfirmModalTemplateView({
                    model: this.model

                }).render();
            },


            _removeDeleteButton: function() {
                if (!Calendar.Controller.session.hasPermission('subject','delete')) {
                    this.$('.removeSubject').remove();
               }
            },

            render: function() {
                this.$el.html(this.template(this.model.toJSON())).draggable({
                    zIndex: 999,
                    revert: true,
                    revertDuration: 0
                });
                this._removeDeleteButton();
                this.$el.addClass('fc-event');
                this.$el.data('subject', this.model);
                this._attachEvents();
                return this;
            }

        });

        return SubjectView;

    }

);
