define('ConfirmModalTemplateView', [
    'jquery',
    'underscore',
    'backbone',
    'text',
    'text!confirmModalWindowTemplate'
], function(
    $,
    _,
    Backbone,
    text,
    confirmModalWindowTemplate) {

    var ConfirmModalTemplateView = Backbone.View.extend({

        template: _.template(confirmModalWindowTemplate),

        initialize: function(options) {
            this.model = options.model;
            this.$el = $(this.template(options.model.toJSON()));
            this.$('.confirmDeleteBtn').off().on('click', $.proxy(this._confirmDelete, this));
        },

        _confirmDelete: function() {
            this.model.destroy();
            this.remove();
            $('.modal-backdrop').hide();
        },

        render: function() {
            this.$el.modal('show');
            return this;
        }

    });

    return ConfirmModalTemplateView;

});
