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
            this.$el = $(this.template(options.categoryModel.toJSON()));
            this.$('.deleteCategoryBtn').off().on('click', $.proxy(options.thatOnCategory._removeCategory, options.thatOnCategory));
        },

        render: function() {
            this.$el.modal('show');
            return this;
        }
    });

    return ConfirmModalTemplateView;

});
