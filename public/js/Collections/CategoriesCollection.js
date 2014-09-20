define('CategoriesCollection', ['jquery', 'underscore', 'backbone', 'CategoryModel'], function($, _, Backbone, CategoryModel) {
    var CategoriesCollection = Backbone.Collection.extend({

        model: CategoryModel

    });

    return CategoriesCollection;
});