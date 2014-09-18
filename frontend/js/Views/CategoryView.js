var CategoryView = Backbone.View.extend({

	el: $('.nav-tabs'),
	template: _.template($('#categoryTemplate').html()),

	initialize: function() {
		$('html').ready(jQuery.proxy(this.render, this));
	},

	render: function() {
		this.$el.html.append(this.template(this.model.toJSON()));
		return this;
	}

});
