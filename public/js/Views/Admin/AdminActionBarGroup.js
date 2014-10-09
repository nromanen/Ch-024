define('AdminActionBarGroup', ['jquery', 'underscore', 'backbone', 'AdminActionBar'],
    function($, _, Backbone) {
var AdminActionBarGroup = Backbone.View.extend({

	initialize: function(options) {
		this.collection = options.collection;
		this.options = options;
		this.collection.bind('add', this.renderView, this);
		this.collection.fetch();
	},

	renderView: function(options) {
		newView = new AdminActionBar({
			model: this.collection.last(),
			templateID: this.options.templateID
		});
		$(this.options.groupClass).append(newView.render());
	}

});
	return AdminActionBarGroup;
});
