var CategoriesCollection = Backbone.Collection.extend({

    model: CategoryModel,

    findModelById: function(id) {
    	return this.findWhere({id: id});
    },

    addModel: function(model) {
    	this.add(model);
    }

});