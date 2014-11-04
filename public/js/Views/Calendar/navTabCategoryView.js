define('navTabCategoryView', [
    'jquery',
    'underscore',
    'backbone',
    'tinycolor',
    'pickacolor',
    'ConfirmModalTemplateView',
    'ControllerView',
    'SessionModel',
    'text!navTabCategoryTemplate'
], function(
    $,
    _,
    Backbone,
    tinycolor,
    pickacolor,
    ConfirmModalTemplateView,
    ControllerView,
    SessionModel,
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
            this.$(this.selectors.removeCategoryButton).on('click', $.proxy(this._showModalForConfirmDelete, this));
        },

        _showModalForConfirmDelete: function() {
            new ConfirmModalTemplateView({
                model: this.model
            }).render();
        },


        _removeDeleteButton: function() {
            if (SessionModel.getRole() === "teacher") {
                this.$('.removeCategory').remove();
            }
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this._removeDeleteButton();
            this._attachEvents();
            return this;
        }

    });

    return navTabCategoryView;

});
