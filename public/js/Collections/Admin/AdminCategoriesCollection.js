define('AdminCategoriesCollection', ['jquery', 'underscore', 'backbone', 'CategoryModel'], function($, _, Backbone, CategoryModel) {
	var AdminCategoriesCollection = Backbone.Collection.extend({
		url: '/category/notapproved',
		model: CategoryModel
	});

	return AdminCategoriesCollection;
});