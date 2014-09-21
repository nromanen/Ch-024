var CategoryView = Backbone.View.extend({

	tagName: 'li',

	selectors: {
		createCategoryButton: ".createCategory",
		removeCategoryButton: ".removeCategory"
	},

	template: _.template($('#navTabCategoryTemplate').html()),

	initialize: function() {
		this.model.bind('destroy', this.remove, this);
	},

	_attachEvents: function() {
        this.$(this.selectors.removeCategoryButton).on('click', $.proxy(this._removeCategory, this));
    },

    _removeCategory: function() {
        this.model.deleteCategory();
        // console.log(this.model);
    },

	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		console.log(this.el);
		this._attachEvents();
		return this;
	}
});