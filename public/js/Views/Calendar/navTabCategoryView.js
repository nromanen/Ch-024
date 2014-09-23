var navTabCategoryView = Backbone.View.extend({

    tagName: 'li',

    template: _.template($('#navTabCategoryTemplate').html()),

    selectors: {
        removeCategoryButton: ".removeCategory"
    },

    initialize: function() {
        this.model.bind('destroy', this.remove, this);
    },

    _attachEvents: function() {
        this.$(this.selectors.removeCategoryButton).on('click', $.proxy(this._removeCategory, this));
    },

    _removeCategory: function() {
        this.model.destroy();
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this._attachEvents();
        return this;
    }

});

