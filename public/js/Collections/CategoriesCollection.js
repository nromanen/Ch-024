define('CategoriesCollection', ['jquery', 'underscore', 'backbone', 'CategoryModel'], function($, _, Backbone, CategoryModel) {
    var CategoriesCollection = Backbone.Collection.extend({

    model: CategoryModel,

    findModelById: function(id) {
    	return this.findWhere({id: id});
    }

    });

    return CategoriesCollection;
});