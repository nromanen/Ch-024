define('navTabCategoryView', [
    'jquery',
    'underscore',
    'backbone',
    'tinycolor',
    'pickacolor',
    'ConfirmModalTemplateView',
    'ControllerView',
    'text!navTabCategoryTemplate'
], function(
    $,
    _,
    Backbone,
    tinycolor,
    pickacolor,
    ConfirmModalTemplateView,
    ControllerView,
    navTabCategoryTemplate) {

    var navTabCategoryView = Backbone.View.extend({

        tagName: 'li',

        template: _.template(navTabCategoryTemplate),

        selectors: {
            removeCategoryButton: ".removeCategory"
        },

        initialize: function() {
            this.model.bind('destroy', this.remove, this);
        },

        _attachEvents: function() {
            this.$(this.selectors.removeCategoryButton).on('click', $.proxy(this._showModalConfirm, this));
        },

        _showModalConfirm: function() {
            new ConfirmModalTemplateView({
                categoryModel: this.model,
                thatOnCategory: this
            }).render();
        },

        _removeCategory: function() {
            ControllerView.addCategoryInActiveClass();
            this.model.destroy();
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this._attachEvents();
            return this;
        }

    });
    return navTabCategoryView;
});
