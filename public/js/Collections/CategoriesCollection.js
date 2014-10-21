define('CategoriesCollection', ['jquery', 'underscore', 'backbone', 'CategoryModel'], function($, _, Backbone, CategoryModel) {
    var CategoriesCollection = Backbone.Collection.extend({

	  	url: '/category',

	    model: CategoryModel,

	    findModelById: function(id) {
	    	return this.findWhere({cid: id});
	    }

    });

    return CategoriesCollection;
});